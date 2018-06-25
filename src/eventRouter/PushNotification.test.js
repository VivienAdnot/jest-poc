//const admin = require('firebase-admin');
import * as firebase from './PushNotification';

firebase.firebaseSendToDevice = jest.fn(() => {

    return Promise.resolve('mock');

});

test('invisible should return if settings are off', () => {

    const params = {
        destination: {
            settings: {
                pushNotification: false
            }
        }
    };

    expect(firebase.pushInvisibleFirebaseNotification(params))
    .resolves.toBe(undefined);

});

// test('invisible should return ok', () => {

//     const params = {
//         destination: {
//             settings: {
//                 pushNotification: true
//             },
//             tokens: {
//                 firebase: {
//                     token: 'c9dp1vFOHhc:APA91bH3t1cV5zL_mAQDd6vihOzrHq1qT52McQfe3PbRz3Woxc96fvcRoHBTs9Sh7ssM-rD_uBpJlr59yluI9uX3xetRurtaGNt5Zj8G-BbJZ1oEjotkePDEW9o5mz1yJa_bGL2eDuWH'
//                 }
//             }
//         }
//     };

//     /*expect(pushInvisibleFirebaseNotification(params))
//     .resolves.toBe('ok');*/

//     return firebase.pushInvisibleFirebaseNotification(params)
//     .then(res => {
//         expect(res).toEqual('mock');
//         expect(firebase.firebaseSendToDevice).toHaveBeenCalledTimes(1);
//     });

// });