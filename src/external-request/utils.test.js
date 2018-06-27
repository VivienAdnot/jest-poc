import { getUriOrReject, isRequestSuccessful } from './utils';
import Promise from 'bluebird';

// ====================================
// getUriOrReject
// ====================================

// test('resolveUri should return null if content is not an url', () => {

//     const shortUri = 'https://repl.it/repls';

//     return expect(getDefaultResponse(shortUri))
//     .toEqual({
//         url: shortUri,
//         title: shortUri
//     });

// });

// ====================================
// isRequestSuccessful
// ====================================

test('isRequestSuccessful should be truthy for status between 200 and 399', () => {

    const statusCodeRanges = [
        { min: 0, max: 199, shouldBeTruthy: false },
        { min: 200, max: 399, shouldBeTruthy: true },
        { min: 400, max: 1000, shouldBeTruthy: false }
    ];

    statusCodeRanges.forEach((range) => {

        const statusCodes = Array.from(
            { length: range.max - range.min },
            (currentValue, index) => range.min + index
        );

        const isRequestSuccessfulResults = statusCodes.map(
            statusCode => isRequestSuccessful(statusCode)
        );

        const eachResultMatchExpected = isRequestSuccessfulResults
            .every(test => test === range.shouldBeTruthy);

        expect(eachResultMatchExpected).toBe(true);

    });

});
