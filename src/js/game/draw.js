import { obj } from 'game/objects';

import {
    GRID_WIDTH, GRID_HEIGHT,
    GRID_COLOR, GRID_BORDER_COLOR,
    WALL_COLOR, WALL_BORDER_COLOR,
    FOOD_COLOR, FOOD_BORDER_COLOR,
    SNAKE_COLOR, SNAKE_BORDER_COLOR,
    HIT_COLOR, HIT_BORDER_COLOR
} from 'game/constants';

let ctx;
let tileWidth;
let tileHeight;

export const setDrawOptions = (context) => {
    ctx = context;
    tileWidth = context.width / GRID_WIDTH;
    tileHeight = context.height / GRID_HEIGHT;
};

export const drawGrid = () => {
    ctx.fillStyle = GRID_COLOR;
    ctx.strokestyle = GRID_BORDER_COLOR;

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
};

export const drawWalls = () => {
    obj.walls.forEach((tile) => {
        drawTile(tile, WALL_COLOR, WALL_BORDER_COLOR);
    });
};

export const drawFood = () => {
    drawTile(obj.food, FOOD_COLOR, FOOD_BORDER_COLOR);
};

export const drawSnake = () => {
    obj.snake.forEach((tile) => {
        drawTile(tile, SNAKE_COLOR, SNAKE_BORDER_COLOR);
    });
};

export const drawHit = () => {
    obj.snake.slice(1, 2).forEach((tile) => {
        drawTile(tile, HIT_COLOR, HIT_BORDER_COLOR);
    });
};

const drawTile = ({x, y} = {x: null, y: null}, color, borderColor) => {
    if (x !== null && y !== null) {
        ctx.fillStyle = color;
        ctx.strokestyle = borderColor;

        ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
        ctx.strokeRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
    }
};
