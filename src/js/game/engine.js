import _ from 'lodash';

import { setDrawOptions, drawGrid, drawWalls, drawFood, drawSnake, drawHit } from 'game/draw';
import { obj, initWalls, initFood, initSnake, updateSnake } from 'game/objects';
import { initKeys, resetKeys, getKey } from 'game/keys';
import { floatToDirection, arrayToDirection } from 'game/utils';
import { getState } from 'game/state';
import { TIME_DELAY } from 'game/constants';

let statusCallback;
let simulationCallback;
let frameRequest;
let direction;
let output;
let alive;
let timer;
let delay;
let runAi;
let age;
let ai;

let calls = 0;

export const initGame = (context, callback) => {
    statusCallback = callback;

    setDrawOptions(context);
    initKeys();
    initWalls();
    initSnake();
    render();
};

export const setGameOptions = ({speed}) => {
    delay = TIME_DELAY - (speed * 20);
};

export const startSimulation = (aiObject, callback) => {
    ai = aiObject;
    simulationCallback = callback;

    age = 0;

    reset();
    drawGrid();
    simulate();
};

export const restartGame = (runAiGame) => {
    runAi = runAiGame;
    age = 0;

    reset();
    loop();
};

export const setGameAi = (aiObject) => {
    ai = aiObject;
};

const reset = () => {
    stopGame();
    resetKeys();
    initWalls();
    initSnake();
    initFood();
};

const stopGame = () => {
    if (frameRequest) {
        window.cancelAnimationFrame(frameRequest);
        clearTimeout(timer);
    
        frameRequest = null;
        timer = null;
    }
};

const loop = () => {
    timer = setTimeout(() => {
        frameRequest = window.requestAnimationFrame(loop);

        if (runAi) {
            output = ai.activate(getState());
            //direction = floatToDirection(output);
            direction = arrayToDirection(output);

        } else {
            direction = getKey();
        }
        
        alive = updateSnake(direction);
        
        statusCallback(getStatus(alive));

        if (alive) {
            age++;
            render();
        } else {
            drawHit();
            stopGame();
        }

    }, delay);
};

const simulate = () => {
    output = ai.activate(getState());
    //direction = floatToDirection(output);
    direction = arrayToDirection(output);
    alive = updateSnake(direction);

    if (alive && age < ai.maxAge) {
        age++;

        if (++calls % 1000 === 0) {
            calls = 0;
            _.delay(simulate, 0);

        } else {
            simulate();
        }
        
    } else {
        simulationCallback(getStatus(alive));
    }
};

const render = () => {
    drawGrid();
    drawWalls();
    drawFood();
    drawSnake();
};

const getStatus = (alive) => ({
    age: age,
    length: obj.snake.length,
    alive: alive
});
