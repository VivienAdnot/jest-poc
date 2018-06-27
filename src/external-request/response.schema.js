import Ajv from 'ajv';
import setupAsync from 'ajv-async';

const ANCHOR_SCHEMA = {
    $async: true,
    type: 'object',
    properties: {
        url: { type: 'string' },
        image: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        width: { type: 'string' },
        height: { type: 'string' }
    },
    required: ['url'],
    additionalProperties: false
};

const ajv = setupAsync(new Ajv({
    coerceTypes: true,
    removeAdditional: true,
    allErrors: true
}));
const validate = ajv.compile(ANCHOR_SCHEMA);

export default validate;
