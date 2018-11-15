import { obj } from 'game/objects';
import { GRID_WIDTH, GRID_HEIGHT } from 'game/constants';

export const getGrid = () => {
    const grid = [];

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

    obj.walls.forEach(({x, y}) => {
        grid[x][y].type = 'wall';
    });

    grid[obj.food.x][obj.food.y].type = 'food';

    obj.snake.forEach(({x, y, direction}) => {
        grid[x][y].type = 'snake';
        grid[x][y].direction = direction;
    });

    grid[obj.snake[0].x][obj.snake[0].y].head = true;

    return grid;
};
