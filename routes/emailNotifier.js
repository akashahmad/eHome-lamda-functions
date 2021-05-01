
'use strict';

const { okResponse, errorResponse } = require('../utils/HttpResponse')
const { sendEmail } = require('../utils/emailHandler');

module.exports = async (event, context, callback) => {
    try {
        const payload = JSON.parse(event.body);
        await sendEmail(payload);
        return okResponse({
            message: 'Email has been processed, please review status for further information.'
        })
    } catch (err) {
        return errorResponse(err);
    }
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}