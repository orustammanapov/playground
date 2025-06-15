'use strict';

const https = require('https');
const options = {
    host: 'https://stat-hh-mls-user-dev-orma.corp.statista.com/',
    port: 443,
    path: '/lambda/',
    method: 'POST',
    rejectUnauthorized: false,
    headers: {'Content-Type': 'application/json'}
};

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
exports.handler = (event, context, callback) => {
    var message = JSON.parse(event['Records'][0]['Sns']['Message']);
    var emailAddress = message.mail.destination.toString();
    var bounceType = message.bounce.bounceType.toString();
    
    if (bounceType === 'Permanent') {
        const req = https.request(options, (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.headers['content-type'] === 'application/json') {
                    body = JSON.parse(body);
                }
                callback(null, body);
            });
        });
        req.on('error', callback);
        req.write(JSON.stringify(message));
        req.end();
        
        console.log(emailAddress + ' marked as bouncer - source: ' + message.mail.source.toString());        
    }
};

// var AWS = require('aws-sdk');

// exports.handler = function (event, context, callback) {
//     AWS.config.update({ region: 'eu-central-1' });
//     var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

//     var params = {
//         DelaySeconds: 10,
//         MessageAttributes: {
//             "Hello": {
//                 DataType: "String",
//                 StringValue: "From Paris with love"
//             },
//         },
//         MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
//         QueueUrl: "http://host.docker.internal:4566/000000000000/s3-notifications"
//     };

//     sqs.sendMessage(params, function (err, data) {
//         if (err) {
//             console.log("\n*** Bla Bla Error ***\n", err);
//             return;
//         }
//         console.log("\n*** Bla Bla Success ***\n", data.MessageId);
//     });
// };





// {
//     "FunctionName": "test",
//     "FunctionArn": "arn:aws:lambda:eu-central-1:000000000000:function:test",
//     "Runtime": "nodejs10.x",
//     "Role": "arn:aws:iam::123456789012:role/aws-lambda-local",
//     "Handler": "index.handler",
//     "CodeSize": 3506,
//     "Description": "",
//     "Timeout": 3,
//     "LastModified": "2022-10-21T15:20:25.071+0000",
//     "CodeSha256": "wLE3ZKVL0OxGXbC8kTcf4q20YyQzFIDYgso0nx93Dno=",
//     "Version": "$LATEST",
//     "VpcConfig": {},
//     "TracingConfig": {
//         "Mode": "PassThrough"
//     },
//     "RevisionId": "e9f39ea3-c926-4fe3-b97a-6121a23ca8be",
//     "State": "Active",
//     "LastUpdateStatus": "Successful",
//     "PackageType": "Zip",
//     "Architectures": [
//         "x86_64"
//     ]
// }



// {
//     "FunctionName": "lambda",
//     "FunctionArn": "arn:aws:lambda:eu-central-1:000000000000:function:lambda",
//     "Runtime": "nodejs10.x",
//     "Role": "arn:aws:iam::123456789012:role/aws-lambda-local",
//     "Handler": "index.handler",
//     "CodeSize": 3880,
//     "Description": "",
//     "Timeout": 3,
//     "LastModified": "2022-10-21T15:49:46.190+0000",
//     "CodeSha256": "36XEaqUAmUILFVXz1otEt4brD6/fEF0RZga20hzSP0Q=",
//     "Version": "$LATEST",
//     "VpcConfig": {},
//     "TracingConfig": {
//         "Mode": "PassThrough"
//     },
//     "RevisionId": "d909615a-8bc7-4c29-b927-de59ae9deb1a",
//     "State": "Active",
//     "LastUpdateStatus": "Successful",
//     "PackageType": "Zip",
//     "Architectures": [
//         "x86_64"
//     ]
// }



// UPDATE
// {
//     "FunctionName": "lambda",
//     "FunctionArn": "arn:aws:lambda:eu-central-1:000000000000:function:lambda",
//     "Runtime": "nodejs10.x",
//     "Role": "arn:aws:iam::123456789012:role/aws-lambda-local",
//     "Handler": "index.handler",
//     "CodeSize": 3880,
//     "Description": "",
//     "Timeout": 3,
//     "LastModified": "2022-10-21T15:54:34.235+0000",
//     "CodeSha256": "36XEaqUAmUILFVXz1otEt4brD6/fEF0RZga20hzSP0Q=",
//     "Version": "$LATEST",
//     "VpcConfig": {},
//     "TracingConfig": {
//         "Mode": "PassThrough"
//     },
//     "RevisionId": "d909615a-8bc7-4c29-b927-de59ae9deb1a",
//     "State": "Active",
//     "LastUpdateStatus": "Successful",
//     "PackageType": "Zip",
//     "Architectures": [
//         "x86_64"
//     ]
// }