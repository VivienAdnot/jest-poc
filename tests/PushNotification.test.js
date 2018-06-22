import pushInvisibleFirebaseNotification from '../src/PushNotification';

test('invisible should return if settings are off', () => {

    const params = {
        destination: {
            settings: {
                pushNotification: false
            }
        },
        code: undefined
    };

    expect(pushInvisibleFirebaseNotification(params))
    .resolves.toBe(undefined);

});