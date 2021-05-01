'use strict';
const singleProperty = require("./routes/singleProperty");
const mapLocations = require("./routes/mapLocations");
const propertiesListing = require("./routes/propertiesListing");
const searchProperties = require("./routes/searchProperties");
const propertiesWithAttom = require("./routes/propertiesWithAttom");
const emailNotifier = require("./routes/emailNotifier");
const test = require("./routes/test");


module.exports.singleProperty = singleProperty;
module.exports.mapLocations = mapLocations;
module.exports.propertiesListing = propertiesListing;
module.exports.searchProperties = searchProperties;
module.exports.propertiesWithAttom = propertiesWithAttom;
module.exports.emailNotifier = emailNotifier;
module.exports.test = test;