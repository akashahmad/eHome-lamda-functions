
'use strict';

const { default: axios } = require("axios");
const { okResponse, errorResponse } = require('../utils/HttpResponse')
const { ATTOM_DATA_HEADERS } = require('../utils/constants')

module.exports = async (event, context, callback) => {
    const header = {
        headers: ATTOM_DATA_HEADERS
    };
    return await axios.get('https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address=73%20Circle%20Dr%2CRockaway', header)
        .then(async res => {
            return okResponse(res.data)
        }).catch(() => {
            return errorResponse();
        })
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}