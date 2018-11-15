import { foodHitsSnake, headHitsSnake, headHitsFood, headHitsWall } from 'game/collisions';
import { directionToDelta, random, randomDirection, fixOppositeDirection } from 'game/utils';
import { GRID_WIDTH, GRID_HEIGHT } from 'game/constants';

export const obj = {
    walls: undefined,
    food: undefined,
    snake: undefined
};

export const initWalls = () => {
    obj.walls = [];

    [...Array(GRID_WIDTH).keys()].forEach((x) => {
        obj.walls.push({x: x, y: 0});
        obj.walls.push({x: x, y: GRID_HEIGHT - 1});
    });

    [...Array(GRID_HEIGHT).keys()].forEach((y) => {
        obj.walls.push({x: 0, y: y});
        obj.walls.push({x: GRID_WIDTH - 1, y: y});
    });
};

export const initFood = () => {
    obj.food = {
        x: random(1, GRID_WIDTH - 1),
        y: random(1, GRID_HEIGHT- 1)
    };

    checkFoodPosition();
};

export const initSnake = () => {
    obj.snake = [
        {x: Math.floor(GRID_WIDTH / 2), y: Math.floor(GRID_HEIGHT / 2), direction: randomDirection()}
    ];
};

export const updateSnake = (direction) => {
    let dir = direction || obj.snake[0].direction;
    
    dir = fixOppositeDirection(dir, obj.snake[0].direction);

    const delta = directionToDelta(dir);

    const head = {
        x: obj.snake[0].x + delta.x,
        y: obj.snake[0].y + delta.y,
        direction: dir
    };

    obj.snake.unshift(head);

    if (headHitsSnake(head, obj.snake) || headHitsWall(head, obj.walls)) {
        return false;
    
    } else if (headHitsFood(head, obj.food)) {
        initFood();
    
    } else {
        obj.snake.pop();
    }

    return true;
};

const checkFoodPosition = () => {
    if (foodHitsSnake(obj.food, obj.snake)) {
        initFood();
        checkFoodPosition();
    }
};
