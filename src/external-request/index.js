import Raven from 'raven';
import Promise from 'bluebird';
import { isRequestSuccessful, getUriOrReject } from './utils';
import * as pictureParser from './parsers/picture';
import * as htmlParser from './parsers/html';
import validate from './response.schema';

const request = Promise.promisify(require('request'));

const sentryUrl = 'https://b722fedddaa648aaaa4146df487e02d0@sentry.io/1200283';
Raven
    .config(sentryUrl, {
        captureUnhandledRejections: true
    })
    .install();

const parsers = [pictureParser, htmlParser];

export const getDefaultResponse = uri =>

    ({
        url: uri,
        title: uri.length > 25 ? `${uri.substr(0, 25)}...` : uri
    });

export const getParser = (response) => {

    const matchedParser = parsers.find(
        parser => parser.matchMimeType(response)
    );

    return (matchedParser)
        ? Promise.resolve(matchedParser)
        : Promise.reject(new Error('no mime parser matched the type'));

};

export const resolveUri = content =>

    getUriOrReject(content)
    .then(uri =>

        request({
            method: 'GET',
            uri,
            followRedirect: true,
            maxRedirects: 2
        })
        .then((response) => {

            if (!response || !isRequestSuccessful(response.statusCode)) {

                return getDefaultResponse(uri);

            }

            return getParser(response)
            .then((parser) =>

                parser.extractData(response)
                .then(data =>

                    validate(data)
                    .then(() => data)

                )

            );

        })
        .catch((e) => {

            Raven.captureException(e);
            return getDefaultResponse(uri)

        })

    )
     // stop silently
    .catch(() => Promise.resolve(null));
