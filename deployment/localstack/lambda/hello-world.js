exports.handler = async (event, context, callback) => {
    // context.succeed('hello world');
    // console.log("Hello World");
    // callback(null, "success")
    return {
        statusCode: 200,
        body: JSON.stringify("Hi from lambda on localstack")
    };
};