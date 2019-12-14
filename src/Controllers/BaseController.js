'use strict';

const _ = require('lodash');
const HTTP_ERRORS = {
    INVALID_DATA: 'invalid_data',
    NOT_EXISTING: 'not_existing',
    missingId: id => `missing_${id}`,
    internal: code => `internal_server_error:${code}`,
};

class BaseController {

    async response(promise, errorCode) {
        let response = {};
        try {
            response = await promise;
        } catch(err) {
            let error;
            if('NotFound' === err.name) {
                error = HTTP_ERRORS.NOT_EXISTING;
            } else if('ValidationError' === err.name) {
                error = HTTP_ERRORS.INVALID_DATA;
            } else {
                error = HTTP_ERRORS.internal(errorCode);
            }

            const errorResponse = { ok: false, error };
            if(!_.isNil(err.errors)) {
                errorResponse.details = err.errors;
            }

            return errorResponse;
        }

        if(!_.isArray(response)) {
            response = [response];
        }

        return { ok: true, data: { items: response } };
    }

}

module.exports = BaseController;
