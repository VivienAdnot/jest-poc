const Raven = jest.genMockFromModule('raven');

Raven.captureException = () => {
    return 'captureException called';
};

Raven.config = () => ({

    install: () => {
        return 'config install'
    }

});

Raven.requestHandler = () => {
    return 'requestHandler called';
};

Raven.setContext = () => {
    return 'setContext called';
};

Raven.errorHandler = () => {
    return 'errorHandler called';
};

export default Raven;