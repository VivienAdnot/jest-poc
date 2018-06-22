const app = require('../src/app');
const math = require('../src/math');

// below is the easiest and most common form of mocking
// the only disadvantage is that it is difficult to access the original implementation of the module.

// set all module functions to jest.fn
jest.mock('../src/math.js');

test('calls math.add', () => {
    app.doAdd(1, 2);
    expect(math.add).toHaveBeenCalledWith(1, 2);
});

test('calls math.subtract', () => {
    app.doSubtract(1, 2);
    expect(math.subtract).toHaveBeenCalledWith(1, 2);
});