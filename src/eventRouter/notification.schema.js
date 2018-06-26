import Ajv from 'ajv';
import setupAsync from 'ajv-async';

const acceptedLanguages = ['fr', 'en', 'es', 'th', 'vi', 'ru', 'de'];
export const MOBILE_IOS = 'ios';
export const MOBILE_ANDROID = 'android';

const SETTINGS_SCHEMA_SUBSET = {
    type: 'object',
    properties: {
        language: { type: 'string', maximum: 2, default: 'fr', enum: acceptedLanguages },
        pushNotification: { type: 'boolean', default: true }
    },
    required: ['pushNotification']
};

const TOKENS_SCHEMA_SUBSET = {
    type: 'object',
    properties: {
        firebase: {
            type: 'object',
            properties: {
                token: { type: 'string' },
                mobile: { type: 'string', enum: [MOBILE_IOS, MOBILE_ANDROID] }
            },
            required: ['token', 'mobile']
        }
    }
};

const PUSH_INVISIBLE_FIREBASE_NOTIFICATION_PARAMETERS_SCHEMA = {
    $async: true,
    type: 'object',
    properties: {
        destination: {
            type: 'object',
            properties: {
                tokens: TOKENS_SCHEMA_SUBSET,
                settings: SETTINGS_SCHEMA_SUBSET,
            },
            required: ['tokens', 'settings']
        },
        code: { type: 'string' },
        additionalData: {
            type: 'object',
            patternProperties: {
                '^.*$': { type: ['number', 'string']}
            }
        },
        options: {
            type: 'object',
            properties: {
                priority: { type: 'string', enum: ['high', 'normal'] },
                timeToLive: { type: 'number', minimum: 0 }
            }
        }
    },
    required: ['destination', 'code'],
    additionalProperties: false
};

const ajv = setupAsync(new Ajv({
    coerceTypes: true,
    removeAdditional: false,
    allErrors: false
}));

const validate = ajv.compile(PUSH_INVISIBLE_FIREBASE_NOTIFICATION_PARAMETERS_SCHEMA);

export default validate;
