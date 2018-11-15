export const foodHitsSnake = (food, snake) => {
    return tileHitsArray(food, snake);
};

export const headHitsSnake = (head, snake) => {
    return tileHitsArray(head, snake.slice(1));
};

export const headHitsFood = (head, food) => {
    return head.x === food.x && head.y === food.y;
};

export const headHitsWall = (head, walls) => {
    return tileHitsArray(head, walls);
};

const tileHitsArray = (tile, array) => {
    return array.some(({x, y}) => {
        return tile.x === x && tile.y === y;
    });
};
