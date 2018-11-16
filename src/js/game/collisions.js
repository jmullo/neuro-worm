import { obj } from 'game/objects';

export const foodHitsSnake = () => {
    return tileHitsArray(obj.food, obj.snake);
};

export const headHitsSnake = () => {
    return tileHitsArray(obj.head, obj.snake.slice(1));
};

export const headHitsFood = () => {
    return obj.head.x === obj.food.x && obj.head.y === obj.food.y;
};

export const headHitsWall = () => {
    return tileHitsArray(obj.head, obj.walls);
};

const tileHitsArray = (tile, array) => {
    return array.some(({x, y}) => {
        return tile.x === x && tile.y === y;
    });
};
