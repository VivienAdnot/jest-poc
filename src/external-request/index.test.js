import { getDefaultResponse, getParser, resolveUri } from './index';

describe('getDefaultResponse', () => {

    test('when uri is short', () => {

        const shortUri = 'https://repl.it/repls';

        return expect(getDefaultResponse(shortUri))
        .toEqual({
            url: shortUri,
            title: shortUri
        });

    });

    test('when uri is long', () => {

        const tooLongUri = 'https://www.amplement.com/common/appBootstrap.js';

        return expect(getDefaultResponse(tooLongUri))
        .toEqual({
            url: 'https://www.amplement.com/common/appBootstrap.js',
            title: 'https://www.amplement.com...'
        });

    });

});

describe('getParser', () => {

    test('should return htmlParser', () => {

        const mockResponse = {
            headers: {
                'content-type': 'text/html'
            }
        };

        return getParser(mockResponse)
        .then(parser => expect(parser.name).toBe('html'));

    });

    test('should return pictureParser', () => {

        const mockResponse = {
            headers: {
                'content-type': 'image/png'
            }
        };

        return getParser(mockResponse)
        .then(parser => expect(parser.name).toBe('picture'));

    });

    test('should reject when unknown mime type', () => {

        const mockResponse = {
            headers: {
                'content-type': 'coucou'
            }
        };

        return getParser(mockResponse)
        .catch(error => expect(error).toBeDefined());

    });

});

describe('resolveUri', () => {

    test('should return null if content is not an url', () => {

        const content = 'ok';

        return expect(resolveUri(content))
        .resolves.toBe(null);

    });

    describe('should return valid data', () => {

        test('when mime type is picture', () => {

            const content = 'https://www.amplement.com/common/img/img-31b0d5.png';

            return expect(resolveUri(content))
            .resolves.toEqual({
                url: 'https://www.amplement.com/common/img/img-31b0d5.png',
                image: 'https://www.amplement.com/common/img/img-31b0d5.png'
            });

        });

        test('when mime type is html', () => {

            const content = 'http://exploringjs.com/es2018-es2019/toc.html';

            return expect(resolveUri(content))
            .resolves.toEqual({
                url: 'http://exploringjs.com/es2018-es2019/toc.html',
                title: 'Exploring ES2018 and ES2019',
                description: undefined
            });

        });

    });

    test('should return default data when mime type is unknown', () => {

        const content = 'https://www.amplement.com/common/appBootstrap.js';

        return expect(resolveUri(content))
        .resolves.toEqual({
            url: content,
            title: 'https://www.amplement.com...'
        });

    });

});
