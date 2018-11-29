import _ from 'lodash';
import { Neat, architect, methods } from 'neataptic';

let neat;
let genome;
let genomeIndex;
let simulationFunction;
let evolutionCallback;

const lengthScore = 1;
const ageScore = -0.02;
const deathScore = -2;
const maxAge = 1000;

const inputSize = 12;
const hiddenSize = 6;
const outputSize = 4;
const generations = 10;
const populationSize = 100;
const elitismPercent = 10;
const mutationRate = 50;
const mutationAmount = 50;

let generation = 0;
let genomeAges = [];
let genomeScores = [];

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

    } else {
        genome = null;
    }
};

const selectNextGeneration = async () => {
    const bestGenome = await neat.evolve();

    const stats = {
        generation: neat.generation,
        avgAge: Math.floor(_.mean(genomeAges)),
        avgScore: Math.floor(_.mean(genomeScores)),
        maxScore: Math.floor(bestGenome.score)
    }
    
    //console.log(`generation: ${stats.generation}, avg age: ${stats.avgAge}, avg score: ${stats.avgScore}, max score: ${stats.maxScore}`);

    genomeIndex = 0;
    genomeAges = [];
    genomeScores = [];

    if (++generation < generations) {
        evolutionCallback({
            ready: false,
            stats: stats
        });

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
    genome.score = (status.length * lengthScore) + (status.age * ageScore) - lengthScore;

    if (!status.alive) {
        genome.score += deathScore;
    }

    genomeAges.push(status.age);
    genomeScores.push(genome.score);
    
    evolve();
};
