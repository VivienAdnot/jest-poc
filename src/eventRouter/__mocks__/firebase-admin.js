const firebase = jest.genMockFromModule('firebase-admin');

firebase.credential = {
    cert: () => {}
};

firebase.initializeApp = () => {
    //console.log('firebaseAdmin initializeApp manual mock called');
    return 'init ok';
};

firebase.messaging = () => ({

    sendToDevice: () => {
        //console.log('firebaseAdmin messaging().sendToDevice manual mock called');
        return Promise.resolve('sendToDevice ok');
    }

});

export default firebase;