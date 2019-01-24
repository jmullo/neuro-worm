import _ from 'lodash';
import { Neat, architect, methods } from 'neataptic';

let neat;
let genome;
let genomeIndex;
let simulationFunction;
let evolutionCallback;

const lengthScore = 1;
const ageScore = 0;
const deathScore = -1;
let maxAge = 200;

const inputSize = 12;
const hiddenSize = 12;
const outputSize = 4;

const lives = 4;
const generations = 10;
const populationSize = 100;
const elitismPercent = 75;
const mutationRate = 50;
const mutationAmount = 50;

let generation = 0;
let genomeAges = [];

neat = new Neat(
    inputSize,
    outputSize,
    null,
    {
        selection: methods.selection.POWER,
        mutation: [
            //methods.mutation.ADD_NODE,
            //methods.mutation.SUB_NODE,
            methods.mutation.ADD_CONN,
            methods.mutation.SUB_CONN,
            methods.mutation.MOD_WEIGHT,
            methods.mutation.MOD_BIAS,
            //methods.mutation.MOD_ACTIVATION,
            //methods.mutation.SWAP_NODES,

            //methods.mutation.ADD_GATE,
            //methods.mutation.SUB_GATE,
            //methods.mutation.ADD_SELF_CONN,
            //methods.mutation.SUB_SELF_CONN,
            //methods.mutation.ADD_BACK_CONN,
            //methods.mutation.SUB_BACK_CONN
        ],
        popsize: populationSize,
        mutationRate: mutationRate,
        mutationAmount: mutationAmount,
        elitism: Math.round(elitismPercent / 100 * populationSize),
        network: new architect.Random(inputSize, hiddenSize, outputSize),
        //network: new architect.Perceptron(inputSize, 24, 6, outputSize)
    }
);

genomeIndex = 0;

export const getAi = () => {
    return genome || neat.population[0];
};

export const evolve = (simFunction, callback) => {
    if (simFunction) {
        simulationFunction = simFunction;
        evolutionCallback = callback;
    }

    selectNextGenome();

    if (genome) {
        simulationFunction(genome, simulationCallback);
    } else {
        selectNextGeneration();
    }
};

const selectNextGenome = () => {
    if (neat.population[genomeIndex]) {
        genome = neat.population[genomeIndex++];
        genome.maxAge = maxAge;
        genome.lives = lives;

    } else {
        genome = null;
    }
};

const selectNextGeneration = async () => {
    const bestGenome = await neat.evolve();

    const stats = {
        generation: neat.generation,
        avgAge: Math.floor(_.mean(genomeAges)),
        bestScore: Math.floor(bestGenome.score)
    }
    
    genomeIndex = 0;
    genomeAges = [];

    if (++generation < generations) {
        evolutionCallback({
            ready: false,
            stats: stats
        });

        if (stats.bestScore / maxAge > 0.1) {
            maxAge += 20;
        }

        evolve();

    } else {
        generation = 0;

        evolutionCallback({
            ready: true,
            bestGenome: bestGenome,
            stats: stats
        });
    }
};

const simulationCallback = (status) => {
    const score = (status.length * lengthScore) + (status.age * ageScore) - lengthScore;

    genome.score = Math.max(score, genome.score || 0);

    if (!status.alive) {
        genome.score += deathScore;
    }

    if (--genome.lives) {
        simulationFunction(genome, simulationCallback);
    } else {
        genomeAges.push(status.age);
    
        evolve();
    }
};
