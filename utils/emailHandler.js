'use strict'

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const SES = new AWS.SES({ apiVersion: '2010-12-01' });

exports.sendEmail = async (payload) => {
    const isHtml = /<[a-z][\s\S]*>/i.test(payload.Message);
    let Body = {};
    if (isHtml) {
        Body = {
            Html: {
                Charset: "UTF-8",
                Data: payload.Message
            }
        };
    } else {
        Body = {
            Text: {
                Charset: "UTF-8",
                Data: payload.Message
            }
        };
    }
    const params = {
        Destination: {
            ToAddresses: payload.ToAddresses
        },
        Message: {
            Body: Body,
            Subject: {
                Charset: 'UTF-8',
                Data: payload.Subject
            }
        },
        Source: payload.FromAddress,
        ReplyToAddresses: [payload.FromAddress]
    };
    try {
        const status = await SES.sendEmail(params).promise();
        return true;
    } catch (err) {
        throw (err);
    }
}