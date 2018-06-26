import IntlMessageFormat from 'intl-messageformat';
import CountryLanguage from 'country-language';
import languagesDefinitions from './definitions';

const Entities = require('html-entities').XmlEntities;

let messages;
let language;

// order is important for language fallback
const acceptedLanguages = ['fr', 'en', 'es', 'th', 'vi', 'ru', 'de'];
const acceptedLocalesFlat = acceptedLanguages
    .map((lang) => {

        const locales = CountryLanguage
            .getLanguage(lang)
            .countries
            .map(country => `${lang}-${country.code_2}`);

        return [...[lang], ...locales];

    })
    .reduce((acc, cur) => acc.concat(cur));

exports.bind = () => (req, res, next) => {

    let locale;
    if (req.cookies && req.cookies.language) {

        locale = req.cookies.language;

    } else {

        locale = req.acceptsLanguages(acceptedLocalesFlat);

    }

    const detectedLanguage = locale && !!acceptedLocalesFlat.filter(lang => lang === locale).length
        ? locale.substr(0, 2) : acceptedLanguages[0];

    if (!setLanguage(detectedLanguage)) {

        next(new Error('this language do not exists'));
        return;

    }

    res.i18n = getMustacheHelper();

    next();

};

exports.formatMessage = formatMessage;
exports.setLanguage = setLanguage;
//exports.getMustacheHelper = getMustacheHelper;
exports.getAcceptedLanguages = () => acceptedLanguages;

// function getMustacheHelper() {

//     return {
//         language,
//         completeLanguage: completeLanguageText(language),
//         formatMessage: () => mustacheFormatMessage,
//         escape: () => mustacheEscape
//     }

// }

function setLanguage(lang) {

    language = lang;
    messages = loadMessages(language);
    return !!messages;

}

function loadMessages(locale) {

    if (!languagesDefinitions[locale]) {

        return false;

    }
    return languagesDefinitions[locale];

}

function completeLanguageText(locale) {

    switch (locale) {

        case 'fr': return 'Français';
        case 'en': return 'English';
        case 'es': return 'Español';
        case 'th': return 'ไทย';
        case 'vi': return 'tiếng Việt';
        case 'ru': return 'русский';
        case 'de': return 'Deutsch';

    }
    return false;

}

function formatMessage(messageKey, values) {

    if (!messages) {

        throw new Error('messages has not been loaded');

    }

    let fallbackMessages = messages;
    if (!fallbackMessages[messageKey]) {

        console.log(`message "${messageKey}" do not exist for the "${language}" language`);
        fallbackMessages = loadMessages(acceptedLanguages[0]);

    }

    if (!fallbackMessages || !fallbackMessages[messageKey]) {

        throw Error(`message "${messageKey}" do not exist for the "${language}" language`);

    }

    const msg = new IntlMessageFormat(fallbackMessages[messageKey], language);
    return msg.format(values);

}

// function mustacheFormatMessage(raw, render) {

//     let data;

//     try {

//         data = JSON.parse(raw);

//     } catch (e) {

//         data = { id: raw };

//     }

//     const { id, values } = data;
//     return values ? render(formatMessage(id, values)) : render(formatMessage(id));

// }

// function mustacheEscape(raw, render) {

//     let data = '';
//     const entities = new Entities();

//     if (typeof raw === 'object') {

//         for(let key in raw) {

//             data[key] = entities.encode(render(raw[key]));

//         }

//     } else if (typeof raw === 'string') {

//         data = entities.encode(render(raw));

//     }

//     return data;

// }
