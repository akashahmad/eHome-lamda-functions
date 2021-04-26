
'use strict';

const { default: axios } = require("axios");
const { okResponse, errorResponse } = require('../utils/HttpResponse')
const { HOME_JUNCTION_HEADERS } = require('../utils/constants')
const { forEach } = require('../utils/functions')

module.exports = async (event, context, callback) => {
    let moreQueryStrings = "";
    if (event.queryStringParameters) {
        Object.keys(event.queryStringParameters).forEach(each => {
            moreQueryStrings += "&" + each + "=" + event.queryStringParameters[each];
        })
    }
    const header = {
        headers: HOME_JUNCTION_HEADERS
    };
    return await axios.get(`https://slipstream.homejunction.com/ws/listings/search?${moreQueryStrings}`, header)
        .then(async res => {
            let listing = [];
            await forEach(res.data.result.listings, (each) => {
                listing.push({
                    id: each.id,
                    systemId: each.systemId,
                    market: each.market,
                    geoType: each.geoType,
                    coordinates: each.coordinates,
                    listPrice: each.listPrice, 
                    beds: each.beds,
                    address: each.address,
                    images: each.images,
                    baths: each.baths,
                    lotSize: each.lotSize,
                    listingType: each.listingType,
                    daysOnHJI: each.daysOnHJI
                })
            });
            return okResponse({
                listing: listing
            })
        }).catch(() => {
            return errorResponse();
        })
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}