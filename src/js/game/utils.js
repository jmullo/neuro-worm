export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
};

export const randomDirection = () => {
    return ['left', 'right', 'up', 'down'][Math.floor(Math.random() * 4)];
};

export const directionToDelta = (direction) => {
    if (direction === 'left') {
        return {x: -1, y: 0};

    } else if (direction === 'right') {
        return {x: 1, y: 0};

    } else if (direction === 'up') {
        return {x: 0, y: -1};

    } else if (direction === 'down') {
        return {x: 0, y: 1};
    }
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
