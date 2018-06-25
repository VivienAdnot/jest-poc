import { doAdd } from './app';
import * as math from './math';

test('calls math.add', () => {
    const addMock = jest.spyOn(math, 'add');

    // override the implementation
    addMock.mockImplementation(() => 'mock');
    expect(doAdd(1, 2)).toEqual('mock');

    //restore the original implementation
    addMock.mockRestore();
    expect(doAdd(1, 2)).toEqual(3);
});