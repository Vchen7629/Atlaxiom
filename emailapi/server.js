require('dotenv').config()
const express = require('express');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
//const fs = require('fs')
const https = require('https');
const checkHost = require('./middleware/checkhostname')
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

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(checkHost)
app.get('/test', (req, res) => {
    res.json({ message: 'Test route working' });
});

app.use('/password', require('./routes/passwordResetRoutes'))

app.use('/contact', require('./routes/contactEmailRoutes'))

const startServer = async () => {
    try {        
        await connectMongoDB();
        await checkDynamoDBConnection()

        if (environment === 'production') {
            https.createServer(httpsOptions, app).listen(8440, '0.0.0.0', () => {
                console.log("HTTPS server running on https://api.atlaxiom.com");
            });
        } else {
            app.listen(PORT, '0.0.0.0', () => {
                console.log(`Development server running on http://localhost:${PORT}`);
            });
        }
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();