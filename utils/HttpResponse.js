'use strict'
const {
  RESPONSE_HEADERS,
  HTTP_OK,
  SUCCESS,
  HTTP_BAD_REQUEST,
  FAILED
} = require('./constants')


module.exports.okResponse = (data) => {
  return {
    statusCode: HTTP_OK,
    headers: RESPONSE_HEADERS,
    body: data ? JSON.stringify({
      success: SUCCESS,
      result: data
    }) : null
  }
}


module.exports.errorResponse = (message) => {
  return {
    statusCode: HTTP_BAD_REQUEST,
    headers: RESPONSE_HEADERS,
    body: JSON.stringify({
      success: false,
      message: message || FAILED
    })
  }
}
