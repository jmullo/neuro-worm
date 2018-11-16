import _ from 'lodash';

import { setDrawOptions, drawGrid, drawWalls, drawFood, drawSnake, drawHit } from 'game/draw';
import { obj, initWalls, initFood, initSnake, updateSnake } from 'game/objects';
import { initKeys, resetKeys, getKey } from 'game/keys';
import { TIME_DELAY } from 'game/constants';

let getSimulatedKey;
let statusCallback;
let simulationCallback;
let frameRequest;
let direction;
let alive;
let timer;
let delay;
let age;

export const initGame = (context, callback, simFunction, simCallback) => {
    statusCallback = callback;
    getSimulatedKey = simFunction;
    simulationCallback = simCallback;

    setDrawOptions(context);
    initKeys();
    initWalls();
    initSnake();

    render();
};

export const setGameOptions = ({speed}) => {
    delay = TIME_DELAY - (speed * 20);
};

export const startSimulation = () => {
    age = 0;

    reset();
    drawGrid();
    simulate();
};

export const restartGame = () => {
    age = 0;

    reset();
    loop();
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

const endGame = () => {
    drawHit();
    stopGame();
};

const loop = () => {
    timer = setTimeout(() => {
        frameRequest = window.requestAnimationFrame(loop);
        direction = getKey();
        alive = updateSnake(direction);
        
        statusCallback(getStatus(alive));

        if (alive) {
            age++;
            render();
        } else {
            endGame();
        }

    }, delay);
};

const simulate = () => {
    direction = getSimulatedKey();
    alive = updateSnake(direction);

    if (alive) {
        age++;
        simulate();
    } else {
        simulationCallback(getStatus(false));
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
