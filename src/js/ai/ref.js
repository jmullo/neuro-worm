import Snake from './snake.class.js';

var neataptic = require('neataptic');
var d3 = require('d3');

/** Rename vars */
var Neat    = neataptic.Neat;
var Methods = neataptic.Methods;
var Architect = neataptic.Architect;

// Global vars
var neat;
var snakes;
var generationLog;
var generationTimeLog;
var iterationCounter;


var mutationRate = .3;

var inputSize = 6;
var startHiddenSize = 1;
var outputSize = 3;


function Manager(){
  this.started = false;
  this.paused = false;

  return this;
}

Manager.prototype = {
  start: function(){
    // this.config = newConfig;

    snakes = [];
    generationLog = [];
    generationTimeLog = [];
    iterationCounter = 0;

    neat = undefined;
    /** Construct the genetic algorithm */  
    neat = new Neat(
      inputSize,
      outputSize,
      null,
      {
        mutation: [
          Methods.Mutation.ADD_NODE,
          Methods.Mutation.SUB_NODE,
          Methods.Mutation.ADD_CONN,
          Methods.Mutation.SUB_CONN,
          Methods.Mutation.MOD_WEIGHT,
          Methods.Mutation.MOD_BIAS,
          Methods.Mutation.MOD_ACTIVATION,
          Methods.Mutation.ADD_GATE,
          Methods.Mutation.SUB_GATE,
          Methods.Mutation.ADD_SELF_CONN,
          Methods.Mutation.SUB_SELF_CONN,
          Methods.Mutation.ADD_BACK_CONN,
          Methods.Mutation.SUB_BACK_CONN
        ],
        popsize: this.config.populationSize,
        mutationRate: mutationRate,
        elitism: Math.round(this.config.elitismPercent / 100 * this.config.populationSize),
        network: new Architect.Random(
          inputSize,
          startHiddenSize,
          outputSize
        )
      }
    );

    

    for(var genome in neat.population){
      genome = neat.population[genome];
      snakes.push(new Snake(genome, this.config));
    }
    this.started = true;
    this.paused = false;

    this.tick();
  },


  tick: function(){
    if(!this.started || this.paused) return;

    var that = this;
    var i;

    iterationCounter++;

    // clone snakes so we don't mess with the originals
    var t_snakes = JSON.parse(JSON.stringify(snakes));

    // store their current order
    for(i in t_snakes){
      t_snakes[i].index = i;
    }
    t_snakes.sort(function(a, b){
      if(a.firstAttemptScore > b.firstAttemptScore) return -1;
      if(a.firstAttemptScore < b.firstAttemptScore) return 1;
      return 0;
    });
    
    // check out many have never died
    // check to see if everyone is either dead or performing negatively
    var hasEveryoneDied = true;
    var areAllAliveSnakesNegative = true;

    for(i in snakes){
      if(snakes[i].deaths === 0){
        hasEveryoneDied = false;
        if(snakes[i].currentScore > 0){
          areAllAliveSnakesNegative = false;
        }
      }
    }

    if(!hasEveryoneDied){
      if(iterationCounter > 10 && areAllAliveSnakesNegative){
        hasEveryoneDied = true;
      }
    }

    if(hasEveryoneDied){

      var new_log = [];

      for(i in t_snakes){
        var top = false;
        if(i < this.config.populationSize * this.config.elitismPercent / 100){
          snakes[t_snakes[i].index].bragCanvas(document.getElementById('snake-canvas-'+ t_snakes[i].index).getContext("2d"));
          top = true;
        } else {
          snakes[t_snakes[i].index].hideCanvas(document.getElementById('snake-canvas-'+ t_snakes[i].index).getContext("2d"));
        }
        new_log.push({
          score: t_snakes[i].firstAttemptScore,
          generation: generationLog.length,
          top: top
        });
      }

      generationLog.push(new_log);
      generationTimeLog.push({
        index: generationTimeLog.length,

      })
    
      setTimeout(function(){
        that.breed();
      }, 1000);
    } else {
      setTimeout(function(){
        for(i in snakes){
          snakes[i].look();
          var context = document.getElementById('snake-canvas-'+ i).getContext("2d");
          snakes[i].showCanvas(context);
          snakes[i].moveCanvas(context);
        }

        that.tick();
      }, 1);
    }
  },

  breed: function(){

    neat.sort();
    var newPopulation = [];
    var i;

    // Elitism
    for(i = 0; i < neat.elitism; i++){
      newPopulation.push(neat.population[i]);
    }

    // Breed the next individuals
    for(i = 0; i < neat.popsize - neat.elitism; i++){
      newPopulation.push(neat.getOffspring());
    }

    // console.log(newPopulation.length);

    // Replace the old population with the new population
    neat.population = newPopulation;
    neat.mutate();

    neat.generation++;

    d3.select('#gen').html(neat.generation + 1);
    
    snakes = [];
    
    for(var genome in neat.population){
      genome = neat.population[genome];
      snakes.push(new Snake(genome, this.config));
    }
    iterationCounter = 0;

    this.tick();
  },

  stop: function(){
    this.started = false;
    this.paused = true;
  },

  pause: function(){
    this.paused = true;
  },

  resume: function(){
    this.paused = false;
    this.tick();
  },

}


export default Manager;