import resolveIfFalse from './promises';

test('resolveIfFalse should resolve with undefined', () => {

    const params = {
        settings: {
            off: true
        }
    };

    expect(resolveIfFalse(params))
    .resolves.toBe(undefined);

});

test('resolveIfFalse should resolve with 1', () => {

    const params = {
        settings: {
            off: false
        }
    };

    expect(resolveIfFalse(params))
    .resolves.toBe(1);

});