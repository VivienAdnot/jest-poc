const resolveIfFalse = (params) => {

    if (params.settings.off) {
        return Promise.resolve();
    }

    return Promise.resolve(1);

};

export default resolveIfFalse;