import {
    pushInvisibleFirebaseNotification,
    pushCallRingingFirebaseNotification
} from '../PushNotification';
import { omit, cloneDeep } from 'lodash';

let defaultFullParams = {
    destination: {
        settings: {
            language: 'fr',
            pushNotification: true
        },
        tokens: {
            firebase: {
                token: 'c9dp1vFOHhc:APA91bH3t1cV5zL_mAQDd6vihOzrHq1qT52McQfe3PbRz3Woxc96fvcRoHBTs9Sh7ssM-rD_uBpJlr59yluI9uX3xetRurtaGNt5Zj8G-BbJZ1oEjotkePDEW9o5mz1yJa_bGL2eDuWH',
                mobile: 'android'
            }
        }
    },
    code: 'POST_FEED',
    additionalData: {
        _relation: 'user id',
        relationData: 1,
        translation: JSON.stringify({
            firstname: 'vivien',
            lastname: 'adnot'
        })
    }
};

test('pushInvisibleFirebaseNotification: schema should fail: missing property destination', () => {
    const params = omit(defaultFullParams, ['destination']);

    return expect(pushInvisibleFirebaseNotification(params))
    .rejects.toBeTruthy();
});

test('pushInvisibleFirebaseNotification: schema should fail: missing property code', () => {
    const params = omit(defaultFullParams, ['code']);

    return expect(pushInvisibleFirebaseNotification(params))
    .rejects.toBeTruthy();
});

test('pushInvisibleFirebaseNotification: schema should fail: translation is not stringified', () => {
    let params = cloneDeep(defaultFullParams);
    params.additionalData.translation = {
        firstname: 'vivien',
        lastname: 'adnot'
    };

    return expect(pushInvisibleFirebaseNotification(params))
    .rejects.toBeTruthy();
});

test('pushInvisibleFirebaseNotification should resolve early when pushNotifications are disabled', () => {

    let params = cloneDeep(defaultFullParams);
    params.destination.settings.pushNotification = false;

    return expect(pushInvisibleFirebaseNotification(params))
    .resolves.toBe(undefined);

});

test('pushInvisibleFirebaseNotification should resolve', () => {

    expect(pushInvisibleFirebaseNotification(defaultFullParams))
    .resolves.toBeDefined();

});

const callRingingParametersAndroid = {
    destination: {
        settings: {
            language: 'fr',
            pushNotification: true
        },
        tokens: {
            firebase: {
                token: 'c9dp1vFOHhc:APA91bH3t1cV5zL_mAQDd6vihOzrHq1qT52McQfe3PbRz3Woxc96fvcRoHBTs9Sh7ssM-rD_uBpJlr59yluI9uX3xetRurtaGNt5Zj8G-BbJZ1oEjotkePDEW9o5mz1yJa_bGL2eDuWH',
                mobile: 'android'
            }
        }
    },
    code: 'CALL_RINGING',
    additionalData: {
        _feed: '8220d753-fb3a-4db9-873f-7cd806addfad',
        call: JSON.stringify({
            "_initiator":null,
            "status":"INACTIVE_CALL_STATE",
            "type":"CALL_TYPE_NONE"
        }),
        initiator: JSON.stringify({
            firstname: 'Vivien',
            lastname: 'Adnot',
            title: 'Développeur',
            // avatarFileName must be set to undefined when needed
            // in order to be ignored by JSON.stringify()
            avatarFileName: undefined
        })
    },
    options: {
        priority: 'high',
        timeToLive: 60
    }
};

let callRingingParametersIOS = cloneDeep(callRingingParametersAndroid);
callRingingParametersIOS.destination.tokens.firebase.mobile = 'ios';

test('pushCallRingingFirebaseNotification should pass on Android', () => {

    const messageResult = {
        data: {
            code: 'CALL_RINGING',
            _feed: '8220d753-fb3a-4db9-873f-7cd806addfad',
            call: '{"_initiator":null,"status":"INACTIVE_CALL_STATE","type":"CALL_TYPE_NONE"}',
            initiator: '{"firstname":"Vivien","lastname":"Adnot","title":"Développeur"}',
            title: 'Vivien Adnot',
            body: 'Appel en cours'
        }
    };

    return pushCallRingingFirebaseNotification(callRingingParametersAndroid)
    .then(({ message }) => {

        return expect(message).toEqual(messageResult);

    });

});

test('pushCallRingingFirebaseNotification should pass on IOS', () => {

    const messageResult = {
        data: {
            code: 'CALL_RINGING',
            _feed: '8220d753-fb3a-4db9-873f-7cd806addfad',
            call: '{"_initiator":null,"status":"INACTIVE_CALL_STATE","type":"CALL_TYPE_NONE"}',
            initiator: '{"firstname":"Vivien","lastname":"Adnot","title":"Développeur"}'
        },
        notification: {
            title: 'Vivien Adnot',
            body: 'Appel en cours',
            sound: 'airtel_tamil.aiff',
            initiator: '{"firstname":"Vivien","lastname":"Adnot","title":"Développeur"}'
        }
    };

    return pushCallRingingFirebaseNotification(callRingingParametersIOS)
    .then(({ message }) => {

        return expect(message).toEqual(messageResult);

    });

});

test('pushCallRingingFirebaseNotification: schema should fail: missing property destination', () => {
    const params = omit(callRingingParametersIOS, ['destination']);

    return expect(pushCallRingingFirebaseNotification(params))
    .rejects.toBeTruthy();
});