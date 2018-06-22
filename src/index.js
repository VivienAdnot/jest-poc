function add(a, b) {
    return a + b;
}

function doAdd(a, b, callback) {
    callback(a + b);
};

module.exports = { add, doAdd };