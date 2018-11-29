import _ from 'lodash';

const vectors = {
    left: {x: -1, y: 0},
    right: {x: 1, y: 0},
    up: {x: 0, y: -1},
    down: {x: 0, y: 1}
};

const floats = {
    left: 0,
    right: 0.3333,
    up: 0.6666,
    down: 1
};

const directions = ['left', 'right', 'up', 'down'];

export const directionToVector = (direction) => {
    return vectors[direction];
};

export const directionToFloat = (direction) => {
    return floats[direction];
};

export const arrayToDirection = (array) => {
    return directions[array.indexOf(Math.max(...array))];
};

export const floatToDirection = (value) => {
    if (value < 0.25) {
        return 'left';
    } else if (value < 0.50) {
        return 'right';
    } else if (value < 0.75) {
        return 'up';
    } else {
        return 'down';
    }
};

export const randomDirection = () => {
    return ['left', 'right', 'up', 'down'][_.random(3)];
};

export const fixOppositeDirection = (direction, prevDirection) => {
    if (direction === 'left' && prevDirection === 'right') {
        return 'right';
    
    } else if (direction === 'right' && prevDirection === 'left') {
        return 'left';
    
    } else if (direction === 'up' && prevDirection === 'down') {
        return 'down';
    
    } else if (direction === 'down' && prevDirection === 'up') {
        return 'up';
    
    } else {
        return direction;
    }
};

export const normalize = (value, min, max) => {
    return (value - min) / (max - min);
};

export const distanceBetween = ({x: x1, y: y1}, {x: x2, y: y2}) => {
    const dx = x1 - x2;
    const dy = y1 - y2;
    
    return Math.sqrt((dx * dx) + (dy * dy));
};
