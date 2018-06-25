import { doAdd, doSubtract, doMultiply } from './app';
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

// test('haha normal', () => {
//     const multiplySpy = jest.spyOn(math, 'multiply');

//     multiplySpy.mockImplementation(() => 0);

//     expect(doMultiply(1, 2)).toBe(0);

//     multiplySpy.mockRestore();

//     expect(doMultiply(1, 2)).toBe(2);
// });

// test('haha should fail', () => {
//     const multiplyByTenSpy = jest.spyOn(math, 'multiplyByTen');

//     multiplyByTenSpy.mockImplementation(() => 0);

//     expect(doMultiply(1)).toBe(0);

//     multiplySpy.mockRestore();

//     expect(doMultiply(1)).toBe(10);
// });