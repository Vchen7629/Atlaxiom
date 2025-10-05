require('source-map-support/register')
const serverlessExpress = require('@codegenie/serverless-express')
const app = require('../server');
const connectDB = require('./dbConn');

let serverlessExpressInstance

async function setup (event, context) {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected.');
    
    serverlessExpressInstance = serverlessExpress({ app })
    return serverlessExpressInstance(event, context)
}

function handler (event, context) {
  if (serverlessExpressInstance) {
    return serverlessExpressInstance(event, context)
  }

  return setup(event, context)
}

exports.handler = handler