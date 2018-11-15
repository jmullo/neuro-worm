let queue = [];
let keyCallback;

export const initKeys = () => {
    document.removeEventListener('keydown', handleKey);
    document.addEventListener('keydown', handleKey);
};

export const resetKeys = () => {
    queue = [];
};

export const getKey = () => {
    return queue.shift();
};

const handleKey = (event) => {
    const left = 37;
    const right = 39;
    const up = 38;
    const down = 40;

    const key = event.keyCode;

    if (key === left) {
        queue.push('left');

    } else if (key === right) {
        queue.push('right');

    } else if (key === up) {
        queue.push('up');

    } else if (key === down) {
        queue.push('down');
    }
};
