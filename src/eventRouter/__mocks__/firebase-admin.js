const firebase = jest.genMockFromModule('firebase-admin');

firebase.credential = {
    cert: () => {}
};

firebase.initializeApp = () => {
    //console.log('firebaseAdmin initializeApp manual mock called');
    return 'init ok';
};

firebase.messaging = () => ({

    sendToDevice: (destination, message, messagingOptions) => {
        console.log('sendToDevice called', message, messagingOptions);
        return Promise.resolve({
            destination,
            message,
            messagingOptions
        });
    }

});

export default firebase;