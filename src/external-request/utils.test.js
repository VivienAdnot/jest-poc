import { getUriOrReject, isRequestSuccessful } from './utils';

describe('getUriOrReject', () => {

    test('should reject if content is not an url', () => {

        const content = 'ok';

        return expect(getUriOrReject(content))
        .rejects.toBe(null);

    });

    describe('should resolve', () => {

        test('when url contains trailing slash', () => {

            const content = 'https://www.amplement.com/feed/e2fbf66a-5c6b-45ad-a7f1-92f69548624e/';

            return expect(getUriOrReject(content))
            .resolves.toEqual(content);

        });

        test('when url contains www', () => {

            const content = 'https://www.amplement.com/feed/e2fbf66a-5c6b-45ad-a7f1-92f69548624e';

            return expect(getUriOrReject(content))
            .resolves.toEqual(content);

        });

        test('when url contains fragment', () => {

            const content = 'http://jestjs.io/docs/en/api#describename-fn';

            return expect(getUriOrReject(content))
            .resolves.toEqual(content);

        });

    });

});

describe('isRequestSuccessful', () => {

    const buildStatusCodes = (min, max) => Array.from(
        { length: max - min },
        (currentValue, index) => min + index
    );

    const areRequestSuccessful = (statusCodes, shouldBeTruthy) => {

        return statusCodes
            .map(statusCode => isRequestSuccessful(statusCode))
            .every(test => test === shouldBeTruthy);

    };

    test('should be falsy for status < 200', () => {

        const statusCodes = buildStatusCodes(0, 199);

        const eachResultMatchExpected = areRequestSuccessful(statusCodes, false);
        expect(eachResultMatchExpected).toBe(true);

    });

    test('should be truthy for status between 200 and 399', () => {

        const statusCodes = buildStatusCodes(200, 399);

        const eachResultMatchExpected = areRequestSuccessful(statusCodes, true);
        expect(eachResultMatchExpected).toBe(true);

    });

    test('should be falsy for status between >= 400', () => {

        const statusCodes = buildStatusCodes(400, 1000);

        const eachResultMatchExpected = areRequestSuccessful(statusCodes, false);
        expect(eachResultMatchExpected).toBe(true);

    });

});
