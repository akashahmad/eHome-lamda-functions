module.exports.NULL = null

module.exports.HTTP_OK = 200
module.exports.HTTP_CREATED = 201
module.exports.HTTP_ACCEPTED = 202
module.exports.HTTP_NOT_FOUND = 404
module.exports.HTTP_BAD_REQUEST = 400
module.exports.HTTP_CONFLICT = 409
module.exports.HTTP_INTERNAL_SERVER_ERROR = 500

module.exports.SUCCESS = true
module.exports.DELETE_SUCCESS = 'Deleted successfully'
module.exports.OK = 'Ok'
module.exports.FAILED = 'Request failed'
module.exports.INTERNAL_SERVER_ERROR = 'Internal server error'
module.exports.ERROR = 'An error occurred. Please try after sometime'
module.exports.ERROR_NOT_FOUND = 'Seems this data is not available'

module.exports.RESPONSE_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization, X-Requested-With, Application'
};

module.exports.HOME_JUNCTION_HEADERS = {
  Authorization: `Bearer s9-b78e82c5-ef55-48d7-a9de-fd6cce202b24`
};

module.exports.ATTOM_DATA_HEADERS = {
  apikey: `debd84878be099ee55370796bdb22170`
};
