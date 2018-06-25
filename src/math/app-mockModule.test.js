import { doAdd, doSubtract } from './app';
import * as math from './math';

// set all module functions to jest.fn
// easiest way to mock the whole file if we don't need to replace implementation
// and it is difficult to access the original implementation of the module.
jest.mock('./math.js');

test('calls math.add', () => {
    doAdd(1, 2);
    expect(math.add).toHaveBeenCalledWith(1, 2);
});

test('calls math.subtract', () => {
    doSubtract(1, 2);
    expect(math.subtract).toHaveBeenCalledWith(1, 2);
});