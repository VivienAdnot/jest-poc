import Promise from 'bluebird';
import { isRequestSuccessful, getUriOrReject } from './utils';
import * as pictureParser from './parsers/picture';
import * as htmlParser from './parsers/html';

import validate from './response.schema';

const request = Promise.promisify(require('request'));

const getDefaultResponse = uri =>

    ({
        url: uri,
        title: uri.length > 25 ? `${uri.substr(0, 25)}...` : uri
    });

const parsers = [pictureParser, htmlParser];

const getParser = (response) => {

    const matchedParser = parsers.find(parser => parser.matchMimeType(response));

    return (matchedParser)
        ? Promise.resolve(matchedParser)
        : Promise.reject(new Error('no mime parser matched the type'));

};

const resolveUri = content =>

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
        .catch(() => getDefaultResponse(uri))

    )
     // stop silently
    .catch(() => Promise.resolve(null));

export default resolveUri;