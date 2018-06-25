const admin = require('firebase-admin');
import config from '../../config/config';

const defaultMessagingOptions = {
    timeToLive: config.firebase.notificationTtl,
    priority: 'normal'
};

admin.initializeApp({
    credential: admin.credential.cert(config.firebaseCert),
    databaseURL: config.firebase.api.databaseURL
});

export let firebaseSendToDevice = (destination, message, messagingOptions) => {
    return admin.messaging().sendToDevice(
        destination.tokens.firebase.token,
        message,
        messagingOptions
    );
};

export const pushInvisibleFirebaseNotification = (parameters) => {

    const {
        destination,
        code,
        additionalData = {},
        options = {}
     } = parameters;

    if (!destination.settings.pushNotification) {

        return Promise.resolve();

    }

    const message = {
        data: {
            code,
            ...additionalData
        }
    };

    const messagingOptions = {
        ...defaultMessagingOptions,
        ...options,
        contentAvailable: true
    };

    return firebaseSendToDevice(destination, message, messagingOptions);

};