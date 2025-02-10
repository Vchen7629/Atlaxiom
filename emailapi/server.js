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

const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.atlaxiom.com/privkey.pem', "utf-8")
const cert = fs.readFileSync('/etc/letsencrypt/live/api.atlaxiom.com/fullchain.pem', "utf-8")
//const privateKey = "placeholder"
//const cert = "placeholder"

const httpsOptions = { key: privateKey, cert };

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || 'https://atlaxiom.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Range, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(200).end(); 
});


app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
//app.use(checkHost)
app.get('/test', (req, res) => {
    res.json({ message: 'Test route working' });
});

app.use("/health", (_, res) => {
    res.status(200).send('OK');
})

app.use('/password', require('./routes/passwordResetRoutes'))

app.use('/contact', (req, res, next) => {
    console.log('Contact route hit:', req.method, req.url);
    next();
}, require('./routes/contactEmailRoutes'));

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