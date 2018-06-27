import getUrls from 'get-urls';

const sanitizeUrl = url =>

    [...getUrls(url, {
        stripWWW: false,
        removeTrailingSlash: false,
        stripFragment: false
    })][0];

const urlFormat = /^((?:https?:\/\/|www\.)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*)/;

export const getUriOrReject = (content) => {

    if (!content.match(urlFormat)) {

        return Promise.reject(null);

    }

    const sanitizedUri = sanitizeUrl(content);

    if (!sanitizedUri) {

        return Promise.reject(null);

    }

    return Promise.resolve(sanitizedUri);

};

export const isRequestSuccessful = statusCode =>
    statusCode >= 200 && statusCode < 400;
