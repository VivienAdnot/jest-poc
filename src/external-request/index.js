import Promise from 'bluebird';
import { isRequestSuccessful, getUriOrReject } from './utils';
import { getPictureResponse, isPicture } from './parsers/picture';
import { getHtmlResponse, isHtml } from './parsers/html';
import validate from './response.schema';

const request = Promise.promisify(require('request'));

const getDefaultResponse = uri =>

    ({
        url: uri,
        title: uri.length > 25 ? `${uri.substr(0, 25)}...` : uri
    });

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

            if (isPicture(response)) {

                return getPictureResponse(response)
                .then(pictureResponse =>

                    validate(pictureResponse)
                    .then(() => pictureResponse)

                );

            } else if (isHtml) {

                return getHtmlResponse(response)
                .then(htmlResponse =>

                    validate(htmlResponse)
                    .then(() => htmlResponse)

                );

            }

            return getDefaultResponse(uri);

        })
        .catch(() => getDefaultResponse(uri))

    )
     // stop silently
    .catch(() => Promise.resolve(null));

export default resolveUri;

