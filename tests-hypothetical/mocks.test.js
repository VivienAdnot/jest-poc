test('returns undefined by default', () => {
    const mock = jest.fn();

    let result = mock('foo');

    expect(result).toBeUndefined();

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith('foo');
});

test('mock implementation', () => {
    const mock = jest.fn(() => 'bar');

    //value 1
    expect(mock('foo1234')).toBe('bar');
    expect(mock).toHaveBeenCalledWith('foo1234');

    // value 2
    expect(mock('foo5678')).toBe('bar');
    expect(mock).toHaveBeenCalledWith('foo5678');

    // with object
    const options = {
        title: 'coucou',
        body: 'haha'
    };

    expect(mock(options)).toBe('bar');
    expect(mock).toHaveBeenCalledWith(options);

    expect(mock).toHaveBeenCalledTimes(3);
});

test('mock implementation one time only', () => {
    const mock = jest.fn().mockImplementationOnce(() => 'bar');

    expect(mock('foo')).toBe('bar');
    expect(mock).toHaveBeenCalledWith('foo');

    expect(mock('baz')).toBe(undefined);
    expect(mock).toHaveBeenCalledWith('baz');
});

test('mock returns value', () => {
    const mock = jest.fn();
    mock.mockReturnValue('bar');

    expect(mock('foo')).toBe('bar');
    expect(mock).toHaveBeenCalledWith('foo');

});

test('mock promise resolution', () => {
    const mock = jest.fn();
    mock.mockResolvedValue('bar');

    expect(mock('foo')).resolves.toBe('bar');
    expect(mock).toHaveBeenCalledWith('foo');
})