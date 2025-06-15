# Useful commands

## Start with environment varaibles
```bash
source ./variables.sh
```



## Useful localstack services
- `SNS` simple notification service
- `SQS` simple queueing service
- `SES` simple email service
- `S3` simple storage service
- `KMS` key management service
- `Kinesis` stream processing
- `Firehose` logging
- `IAM` identity management
- `EC2` elastic cloud compute
- `Lambda` serveless functions
- `DynamoDB` NoSQL database



## S3
### Create Bucket
```bash
a s3api create-bucket \
    --bucket notifiable-bucket \
    --region eu-central-1

# http://notifiable-bucket.s3.localhost.localstack.cloud:4566/
```
### List objects
```bash
a s3api list-objects \
    --bucket notifiable-bucket
```
### Put object
```bash
a s3api put-object \
    --bucket notifiable-bucket \
    --key text/file.txt \
    --body s3/file.txt
```
### Put bucket notification
```bash
a s3api put-bucket-notification \
    --bucket notifiable-bucket \
    --notification-configuration file://s3/notification.json
```
### Get notification configuration
```bash
a s3api get-bucket-notification-configuration \
    --bucket notifiable-bucket
```



## SNS
### Create Topic
```bash
a sns create-topic \
    --name s3-notifications 
```
### Get topic attibutes
```bash
a sns get-topic-attributes \
    --topic-arn arn:aws:sns:eu-central-1:000000000000:s3-notifications
```
### Publish message
```bash
a sns publish \
    --topic-arn arn:aws:sns:eu-central-1:000000000000:sns-messages \
    --message "test message for pub-sub-test topic" # file://message.txt
```

arn:aws:sns:eu-central-1:000000000000:sns-messages
arn:aws:sqs:eu-central-1:000000000000:sns-messages

{
    "SubscriptionArn": "arn:aws:sns:eu-central-1:000000000000:sns-messages:c64fbf52-0002-4e6a-9219-41c821a9d0b5"
}

{
    "MessageId": "53f84061-a8c8-494b-8e33-08668b68dc1f"
}

## SQS
### Create queue
```bash
a sqs create-queue \
    --queue-name s3-notifications \
    --attributes file://sqs/queue-attributes.json
```
### Delete queue
```bash
a sqs delete-queue \
    --queue-url $queue_url
```
### List queues
```bash
a sqs list-queues
```
### Send message
```bash
a sqs send-message \
    --queue-url $queue_url \
    --message-body "Information about the largest city." \
    --delay-seconds 10 \
    --message-attributes file://sqs/message.json
```
### Receive message
```bash
a sqs receive-message \
    --queue-url $queue_url \
    --attribute-names All \
    --message-attribute-names All \
    --max-number-of-messages 1
```
### Queue messages count
```bash
a sqs get-queue-attributes \
    --queue-url $queue_url \
    --attribute-names ApproximateNumberOfMessages
```
### List all queue attributes
```bash
a sqs get-queue-attributes \
    --queue-url $queue_url \
    --attribute-names All
```



## Lambda
### Create function
```bash
a lambda create-function \
    --function-name hello-world \
    --runtime nodejs12.x \
    --zip-file fileb://lambda/hello-world.zip \
    --handler hello-world.handler \
    --role arn:aws:iam::123456789012:role/aws-lambda-local
a lambda create-function \
    --function-name sqs-handler \
    --runtime nodejs12.x \
    --zip-file fileb://lambda/sqs-handler.zip \
    --handler sqs-handler/index.handler \
    --role arn:aws:iam::123456789012:role/aws-lambda-local
a lambda update-function-code \
    --function-name sqs-handler \
    --zip-file fileb://lambda/sqs-handler.zip
```
### Invoke function
```bash
a lambda invoke \
    --function-name hello-world \
    lambda/response.json
a lambda invoke \
    --function-name sqs-handler \
    lambda/response.json
```
### List functions
```bash
a lambda list-functions
```