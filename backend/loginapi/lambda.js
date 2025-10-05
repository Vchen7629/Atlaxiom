// Entry Point for Lambda Functions 

require('source-map-support/register')
const serverlessExpress = require('@codegenie/serverless-express')
const app = require('./server');
const connectDB = require('./config/dbConn');

let serverlessExpressInstance

async function setup (event, context) {
  if (!serverlessExpressInstance) {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected.');

    serverlessExpressInstance = serverlessExpress({ app });
  }
  return serverlessExpressInstance(event, context);
}

function handler (event, context) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204, 
      headers: {
        "Access-Control-Allow-Origin": "https://www.atlaxiom.com",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
      body: "",
    };
  }

  return setup(event, context)
}

exports.handler = handler