var AWS = require('aws-sdk');
var _ = require('lodash');

exports.handler = function (event, context, callback) {
    AWS.config.update({ region: 'eu-central-1' });
    var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

    var params = {
        DelaySeconds: 10,
        MessageAttributes: {
            "Hello": {
                DataType: "String",
                StringValue: "From Paris with love"
            },
        },
        MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
        QueueUrl: "http://host.docker.internal:4566/000000000000/s3-notifications"
    };

    sqs.sendMessage(params, function (err, data) {
        if (err) {
            const message = _.toUpper("Bla Bla Error");
            console.log("\n*** " + message  + " ***\n", err);
            return;
        }
        const message = _.toLower("Bla Bla Success");
        console.log("\n*** " + message  + " ***\n", data.MessageId);
    });
};
