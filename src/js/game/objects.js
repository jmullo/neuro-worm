import _ from 'lodash';

import { foodHitsSnake, headHitsSnake, headHitsFood, headHitsWall } from 'game/collisions';
import { directionToVector, randomDirection, fixOppositeDirection } from 'game/utils';
import { GRID_WIDTH, GRID_HEIGHT } from 'game/constants';

let vector;
let dir;

export const obj = {
    walls: undefined,
    food: undefined,
    snake: undefined,
    head: undefined
};

export const initWalls = () => {
    obj.walls = [];

    _.range(GRID_WIDTH).forEach((x) => {
        obj.walls.push({x: x, y: 0});
        obj.walls.push({x: x, y: GRID_HEIGHT - 1});
    });

    _.range(GRID_HEIGHT).forEach((y) => {
        obj.walls.push({x: 0, y: y});
        obj.walls.push({x: GRID_WIDTH - 1, y: y});
    });
};

export const initFood = () => {
    obj.food = {
        x: _.random(1, GRID_WIDTH - 2),
        y: _.random(1, GRID_HEIGHT - 2)
    };

    checkFoodPosition();
};

export const initSnake = () => {
    obj.snake = [
        {
            x: Math.floor(GRID_WIDTH / 2),
            y: Math.floor(GRID_HEIGHT / 2),
            direction: randomDirection()
        }
    ];

    obj.head = obj.snake[0];
};

export const updateSnake = (direction) => {
    dir = direction || obj.snake[0].direction;
    //dir = fixOppositeDirection(dir, obj.snake[0].direction);
    vector = directionToVector(dir);

    obj.head = {
        x: obj.snake[0].x + vector.x,
        y: obj.snake[0].y + vector.y,
        direction: dir
    };

    obj.snake.unshift(obj.head);
    
    if (headHitsFood()) {
        initFood();
        return true;
    }

    if (headHitsSnake() || headHitsWall()) {
        return false;
    }

    obj.snake.pop();

    return true;
};

const checkFoodPosition = () => {
    if (foodHitsSnake()) {
        initFood();
        checkFoodPosition();
    }
};
