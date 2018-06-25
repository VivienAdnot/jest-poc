import { doAdd, add } from './callbacks';

describe('add', () => {
    it('should add two numbers', () => {
        expect(add(1, 2)).toBe(3);
    })
});

test('calls callback with arguments added', () => {
    const mockCallback = jest.fn();
    doAdd(1, 2, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(3);
});