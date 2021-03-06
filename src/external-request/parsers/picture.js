const isDisplayableMimeType = requestedMimeType => [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/x-ms-bmp',
    'image/svg+xml'

]
    .filter(mimeType => mimeType === requestedMimeType)
    .length > 0;

export const name = 'picture';

export const matchMimeType = response => isDisplayableMimeType(
    response.headers['content-type']
);

export const extractData = (response) => {

    let href;

    try {

        href = response.request.uri.href || null;

    } catch (err) {

        return Promise.reject();

    }

    return Promise.resolve({
        url: href,
        image: href
    });

};
