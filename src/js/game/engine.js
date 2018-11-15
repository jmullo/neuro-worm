import _ from 'lodash';

import { setDrawOptions, drawGrid, drawWalls, drawFood, drawSnake, drawHit } from 'game/draw';
import { obj, initWalls, initFood, initSnake, updateSnake } from 'game/objects';
import { initKeys, resetKeys, getKey } from 'game/keys';
import { TIME_DELAY } from 'game/constants';

let getSimulatedKey;
let statusCallback;
let simulationCallback;
let frameRequest;
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
    stopGame();
    resetKeys();

    initWalls();
    initSnake();
    initFood();

    drawGrid();

    age = 0;

    simulate();
};

export const restartGame = () => {
    stopGame();
    resetKeys();

    initWalls();
    initSnake();
    initFood();

    age = 0;

    loop();
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
    drawHit(obj.snake);
    stopGame();
};

const loop = () => {
    timer = setTimeout(() => {
        frameRequest = window.requestAnimationFrame(loop);

        const direction = getKey();
        //const direction = ['left', 'right', 'up', 'down'][Math.floor(Math.random() * 4)];
        const alive = updateSnake(direction);
        
        updateStatus(alive);

        if (alive) {
            render();
        } else {
            endGame();
        }
    }, delay);
};

const simulate = () => {
    const direction = getSimulatedKey();
    const alive = updateSnake(direction);

    if (alive) {
        age++;
        simulate();
    } else {
        simulationCallback({
            age: age,
            score: obj.snake.length,
            alive: false
        });
    }
};

const render = () => {
    drawGrid();
    drawWalls(obj.walls);
    drawFood(obj.food);
    drawSnake(obj.snake);
};

const updateStatus = (alive) => {
    const status = {
        age: ++age,
        score: obj.snake.length,
        alive: alive
    };

    statusCallback(status);
};
