const firebase = jest.genMockFromModule('firebase-admin');

firebase.credential = {
    cert: () => {}
};

firebase.initializeApp = () => {
    return 'init ok';
};

firebase.messaging = () => ({

    sendToDevice: (destination, message, messagingOptions) => {
        return Promise.resolve({
            destination,
            message,
            messagingOptions
        });
    }

});

export default firebase;