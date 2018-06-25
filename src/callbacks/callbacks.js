export const add = (a, b) => {
    return a + b;
};

export const doAdd = (a, b, callback) => {
    callback(a + b);
};