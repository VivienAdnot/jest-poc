const index = require('./callbacks');

describe('add', () => {
    it('should add two numbers', () => {
        expect(index.add(1, 2)).toBe(3);
    })
});

test('calls callback with arguments added', () => {
    const mockCallback = jest.fn();
    index.doAdd(1, 2, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(3);
});