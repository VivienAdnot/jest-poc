import firebase from 'firebase-admin';
import config from '../config/config';
//import { MOBILE_IOS, MOBILE_ANDROID } from 'v5/User/index/pushNotificationToken.const';
//import { formatMessage, setLanguage } from 'services/i18n';

//const callRingingBodyKey = 'notification.callRinging.body';

const defaultMessagingOptions = {
    timeToLive: config.firebase.notificationTtl,
    priority: 'normal'
};

firebase.initializeApp({
    credential: firebase.credential.cert(config.firebaseCert),
    databaseURL: config.firebase.api.databaseURL
});

const pushInvisibleFirebaseNotification = (parameters) => {

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

    return firebase.messaging().sendToDevice(
        destination.tokens.firebase.token,
        message,
        messagingOptions
    );

};

export default pushInvisibleFirebaseNotification;
