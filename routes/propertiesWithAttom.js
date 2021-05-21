
'use strict';

const { default: axios } = require("axios");
const { okResponse, errorResponse } = require('../utils/HttpResponse')
const { HOME_JUNCTION_HEADERS, ATTOM_DATA_HEADERS } = require('../utils/constants')
const { forEach } = require('../utils/functions')

module.exports = async (event, context, callback) => {
    const market = event.queryStringParameters && event.queryStringParameters.market ? event.queryStringParameters.market : 'gsmls',
        listingType = event.queryStringParameters && event.queryStringParameters.listingType ? event.queryStringParameters.listingType : 'Residential',
        pageNumber = event.queryStringParameters && event.queryStringParameters.pageNumber ? event.queryStringParameters.pageNumber : '1';
    const header = {
        headers: HOME_JUNCTION_HEADERS
    };
    return await axios.get(`https://slipstream.homejunction.com/ws/listings/search?market=${market}&listingType=${listingType}&details=true&extended=true&images=true&listingDate=>6/1/2015&pageNumber=${pageNumber}&pageSize=50`, header)
        .then(async res => {
            let listing = [];
            await forEach(res.data.result.listings, async (each) => {
                if (each.stdAddress && !each.size) {
                    const header2 = {
                        headers: ATTOM_DATA_HEADERS
                    };
                    await axios.get(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address=${(each.stdAddress.deliveryLine?each.stdAddress.deliveryLine:"")}${(each.stdAddress.city?(","+each.stdAddress.city):"")}${(each.stdAddress.state?(","+each.stdAddress.state):"")}`, header2)
                        .then(async ress => {
                            if (ress.data.property && ress.data.property[0]) {
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
                                    size: each.size ? each.size : 0,
                                    listingType: each.listingType,
                                    daysOnHJI: each.daysOnHJI,
                                    building: ress.data.property[0].building
                                })
                            }
                        })
                        .catch(() => {
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
                                size: each.size ? each.size : 0,
                                listingType: each.listingType,
                                daysOnHJI: each.daysOnHJI
                            })
                        })
                } else {
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
                        size: each.size ? each.size : 0,
                        listingType: each.listingType,
                        daysOnHJI: each.daysOnHJI
                    })
                }
            });
            return okResponse({
                currentPage: pageNumber,
                totalPages: Math.ceil(res.data.result.total / 50),
                total: res.data.result.total,
                listing: listing
            })
        }).catch(() => {
            return errorResponse();
        })
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}