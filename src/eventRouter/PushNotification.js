import firebase from 'firebase-admin';
import config from './config';
import validate from './notification.schema';

import { formatMessage, setLanguage } from './services/i18n';

const CALL_RINGING_BODY_KEY = 'notification.callRinging.body';

export const MOBILE_IOS = 'ios';
export const MOBILE_ANDROID = 'android';

const defaultMessagingOptions = {
    timeToLive: config.firebase.notificationTtl,
    priority: 'normal'
};

firebase.initializeApp({
    credential: firebase.credential.cert(config.firebaseCert),
    databaseURL: config.firebase.api.databaseURL
});

export const pushInvisibleFirebaseNotification = (parameters) => {

    return validate(parameters)
    .then(() => {

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

    });

};

export const pushCallRingingFirebaseNotification = (parameters) => {

    const {
        destination,
        code,
        additionalData = {},
        options = {}
     } = parameters;

    // eslint-disable-next-line prefer-const
    let message = {
        data: {
            code,
            ...additionalData
        }
    };

    let content;

    try {

        // Firebase needs every additionalData field to be stringified
        const { firstname, lastname } = JSON.parse(additionalData.initiator);
        setLanguage(destination.settings.language);

        content = {
            title: `${firstname} ${lastname}`,
            body: formatMessage(CALL_RINGING_BODY_KEY)
        };

    } catch (i18nError) {

        return Promise.reject(i18nError);

    }

    if (destination.tokens.firebase.mobile === MOBILE_IOS) {

        message.notification = {
            ...content,
            sound: 'airtel_tamil.aiff',
            initiator: additionalData.initiator
        };

    } else if (destination.tokens.firebase.mobile === MOBILE_ANDROID) {

        message.data = {
            ...message.data,
            ...content
        };

    } else {

        return Promise.reject(new Error(`unknown device ${destination.tokens.firebase.mobile}`));

    }

    const messagingOptions = {
        ...defaultMessagingOptions,
        ...options
    };

    return firebase.messaging().sendToDevice(
        destination.tokens.firebase.token,
        message,
        messagingOptions
    );

};
