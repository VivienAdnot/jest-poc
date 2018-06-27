import cheerio from 'cheerio';

export const name = 'html';

export const matchMimeType = response => response.headers['content-type'].indexOf('text/html') !== -1;

export const extractData = (response) => {

    const DOM = cheerio.load(response.body);

    if (DOM('meta[property="og:title"]').eq(0).length) {

        return Promise.resolve({
            url: DOM('meta[property="og:url"]').eq(0).attr('content'),
            image: DOM('meta[property="og:image"]').eq(0).attr('content'),
            title: DOM('meta[property="og:title"]').eq(0).attr('content'),
            description: DOM('meta[property="og:description"]').eq(0).attr('content'),
            height: DOM('meta[property="og:image:height"]').eq(0).attr('content'),
            width: DOM('meta[property="og:image:width"]').eq(0).attr('content')
        });

    } else if (DOM('meta[property="twitter:title"]').eq(0).length) {

        return Promise.resolve({
            url: response.request.uri.href,
            image: DOM('meta[property="twitter:image"]').eq(0).attr('content'),
            title: DOM('meta[property="twitter:title"]').eq(0).attr('content'),
            description: DOM('meta[property="twitter:description"]').eq(0).attr('content')
        });

    } else if (DOM('title').text()) {

        return Promise.resolve({
            url: response.request.uri.href,
            title: DOM('title').text(),
            description: DOM('meta[name="description"]').eq(0).attr('content')
        });

    }

    return Promise.reject();

};
