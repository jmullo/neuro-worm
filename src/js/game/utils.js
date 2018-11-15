import _ from 'lodash';

export const randomDirection = () => {
    return ['left', 'right', 'up', 'down'][_.random(3)];
};

export const directionToDelta = (direction) => {
    const deltas = {
        left: {x: -1, y: 0},
        right: {x: 1, y: 0},
        up: {x: 0, y: -1},
        down: {x: 0, y: 1}
    };

    return deltas[direction];
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
