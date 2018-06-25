import firebase from 'firebase-admin';
import { pushInvisibleFirebaseNotification } from '../PushNotification';
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

test('schema should fail: missing destination', () => {
    const params = omit(defaultFullParams, ['destination']);

    return expect(pushInvisibleFirebaseNotification(params))
    .rejects.toBeTruthy();

});

test('schema should fail: missing code', () => {
    const params = omit(defaultFullParams, ['code']);

    return expect(pushInvisibleFirebaseNotification(params))
    .rejects.toBeTruthy();
});

test('schema should fail: translation is not stringified', () => {
    let params = cloneDeep(defaultFullParams);
    params.additionalData.translation = {
        firstname: 'vivien',
        lastname: 'adnot'
    };

    return expect(pushInvisibleFirebaseNotification(params))
    .rejects.toBeTruthy();
});

test('invisible should return if settings are off', () => {

    let params = cloneDeep(defaultFullParams);
    params.destination.settings.pushNotification = false;

    return expect(pushInvisibleFirebaseNotification(params))
    .resolves.toBe(undefined);

});

test('invisible should return ok', () => {

    expect(pushInvisibleFirebaseNotification(defaultFullParams))
    .resolves.toEqual('sendToDevice ok');

});