const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const fs = require('fs')

const awsConfig = {
    region: "us-west-1",
    credentials: {
        accessKeyId: process.env.DYNAMODB_ACCESS_KEY_FILE
        ? fs.readFileSync(process.env.DYNAMODB_ACCESS_KEY_FILE, 'utf8').trim()
        : process.env.DYNAMODB_ACCESS_KEY,
        secretAccessKey: process.env.DYNAMODB_SECRET_KEY_FILE
        ? fs.readFileSync(process.env.DYNAMODB_SECRET_KEY_FILE, 'utf8').trim()
        : process.env.DYNAMODB_SECRET_KEY
    }
};

if (!awsConfig.credentials.accessKeyId || !awsConfig.credentials.secretAccessKey) {
    throw new Error('AWS credentials are not properly configured');
}

const client = new DynamoDBClient(awsConfig);
const dynamoDB = DynamoDBDocumentClient.from(client);

const checkDynamoDBConnection = async () => {
    try {
        await dynamoDB.send(new ScanCommand({ 
            TableName: "email-bounces", 
            Limit: 1 
        }));
        console.log('Successfully connected to DynamoDB');
        return true;
    } catch (error) {
        console.error('Failed to connect to DynamoDB:', error);
        throw error;
    }
};


module.exports = { 
    dynamoDB,
    checkDynamoDBConnection
};