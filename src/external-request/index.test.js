import resolveUri from './index';

test('resolveUri should return null if content is not an url', () => {

    const content = 'ok';

    return expect(resolveUri(content))
    .resolves.toBe(null);

});

test('resolveUri should return fetched data if content is a picture', () => {

    const content = 'https://www.amplement.com/common/img/img-31b0d5.png';

    return expect(resolveUri(content))
    .resolves.toEqual({
        url: 'https://www.amplement.com/common/img/img-31b0d5.png',
        image: 'https://www.amplement.com/common/img/img-31b0d5.png'
    });

});

test('resolveUri should return fetched data if content is html', () => {

    const content = 'https://twitter.com/martinfowler';

    return expect(resolveUri(content))
    .resolves.toEqual({
        url: 'https://twitter.com/martinfowler',
        title: 'Martin Fowler (@martinfowler) | Twitter',
        description: 'Les tout derniers Tweets de Martin Fowler (@martinfowler). Programmer, Loud Mouth, ThoughtWorker. Boston'
    });

});

// http://bluebirdjs.com/

test('resolveUri should return default data if content type is unhandled', () => {

    const content = 'https://www.amplement.com/common/appBootstrap.js';

    return expect(resolveUri(content))
    .resolves.toEqual({
        url: 'https://www.amplement.com/common/appBootstrap.js',
        title: 'https://www.amplement.com...'
    });

});
