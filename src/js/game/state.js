import _ from 'lodash';

import { obj } from 'game/objects';
import { distanceBetween, normalize, directionToFloat } from 'game/utils';
import { GRID_WIDTH, GRID_HEIGHT } from 'game/constants';

let grid;
let head;
let food;
let direction;

const maxLength = (GRID_WIDTH - 1) * (GRID_HEIGHT - 1);

export const getState = () => {
    updateGrid();

    head = obj.head;
    food = obj.food;
    direction = obj.head.direction;

    //const length = obj.snake.length;
    
    const goingLeft = direction === 'left';
    const goingRight = direction === 'right';
    const goingUp = direction === 'up';
    const goingDown = direction === 'down';
    const emptyTileLeft = _.get(grid, [obj.head.x - 1, obj.head.y]).type === 'empty';
    const emptyTileRight = _.get(grid, [obj.head.x + 1, obj.head.y]).type === 'empty';
    const emptyTileUp = _.get(grid, [obj.head.x, obj.head.y - 1]).type === 'empty';
    const emptyTileDown = _.get(grid, [obj.head.x, obj.head.y + 1]).type === 'empty';
    const foodLeft = food.x < head.x;
    const foodRight = food.x > head.x;
    const foodUp = food.y < head.y;
    const foodDown = food.y < head.y;

    return [
        //normalize(length, 1, maxLength),
        goingLeft ? 1 : 0,
        goingRight ? 1 : 0,
        goingUp ? 1 : 0,
        goingDown ? 1 : 0,
        emptyTileLeft ? 1 : 0,
        emptyTileRight ? 1 : 0,
        emptyTileUp ? 1 : 0,
        emptyTileDown ? 1 : 0,
        foodLeft ? 1 : 0,
        foodRight ? 1 : 0,
        foodUp ? 1 : 0,
        foodDown ? 1 : 0
    ];
};

const initGrid = () => {
    grid = [];

    _.range(GRID_WIDTH).forEach((x) => {
        const column = [];

        _.range(GRID_HEIGHT).forEach((y) => {
            column.push({
                x: x,
                y: y,
                type: 'empty'
            });
        });

        grid.push(column);
    });
};

const updateGrid = () => {
    if (!grid) {
        initGrid();
    }

    grid.forEach((row) => {
        row.forEach((column) => {
            column.type = 'empty';
        });
    });

    obj.walls.forEach(({x, y}) => {
        grid[x][y].type = 'wall';
    });

    grid[obj.food.x][obj.food.y].type = 'food';

    obj.snake.forEach(({x, y, direction}) => {
        grid[x][y].type = 'snake';
        grid[x][y].direction = direction;
    });

    grid[obj.snake[0].x][obj.snake[0].y].head = true;
};
