import { doAdd, doSubtract } from './app';
// we have to import file like that to be able to mock the const functions
import * as math from './math';

//easiest way to mock functions

math.add = jest.fn();
math.subtract = jest.fn();

test('calls math.add', () => {
    doAdd(1, 2);
    expect(math.add).toHaveBeenCalledWith(1, 2);
});

test('calls math.subtract', () => {
    doSubtract(1, 2);
    expect(math.subtract).toHaveBeenCalledWith(1, 2);
});