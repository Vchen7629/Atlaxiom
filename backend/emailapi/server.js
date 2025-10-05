require('dotenv').config()
const express = require('express');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const https = require('https');
//const checkHost = require('./middleware/checkhostname')
const app = express();
const PORT = 3005;
const connectMongoDB = require('./config/mongodbConn')
const { checkDynamoDBConnection } = require('./config/DynamoDBConn');
const environment = process.env.NODE_ENV || 'production';

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/", (_, res) => res.send("hello from lambda!"))

app.use("/health", (_, res) => {
    res.status(200).send('OK');
})

app.use('/password', require('./routes/passwordResetRoutes'))

app.use('/contact', require('./routes/contactEmailRoutes'));

const startServer = async () => {
    try {        
        await connectMongoDB();
        await checkDynamoDBConnection()

        if (environment === 'production') {
            const httpsServer = https.createServer(httpsOptions, app);

            httpsServer.on('error', (error) => {
                console.error('HTTPS Server Error:', error);
            });

            httpsServer.listen(2096, '0.0.0.0', () => {
                console.log("HTTPS server running on https://api.atlaxiom.com:2096");
            });
        } else {
            app.listen(PORT, '0.0.0.0', () => {
                console.log(`Development server running on http://localhost:${PORT}`);
            });
        }
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); // skipcq: JS-0263
    }
}

startServer();