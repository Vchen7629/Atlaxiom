require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorhandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const fs = require('fs')
const https = require('https');
const checkHost = require('./middleware/checkhostname')

const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.atlaxiom.com/privkey.pem', "utf-8")
const cert = fs.readFileSync('/etc/letsencrypt/live/api.atlaxiom.com/fullchain.pem', "utf-8")

const httpsOptions = { key: privateKey, cert: cert };

connectDB().catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the process if DB connection fails
});

app.use(cors(corsOptions))
app.use(checkHost)
app.use(logger)
app.use(express.json())
app.use(cookieParser())

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Range, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    console.log('Preflight response headers:', res.getHeaders());
    res.status(200).end(); 
});


app.use('/', express.static(path.join(__dirname, 'public'))) /*code for telling the program to fetch static css files from the public folder */

app.use('/', require('./routes/root'))

app.use('/auth', require('./routes/authRoutes'))

app.use('/users', require('./routes/userRoutes'))

app.use('/user', require('./routes/userSignUpRoutes'))

app.use('/card', require('./routes/ownedCardRoutes'))

app.use('/deck', require('./routes/deckRoutes'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: "404 not found"})
    }  else {
        res.type('txt').send('404 not found')
    }
    console.log('Received request:', req.body);


})

app.use(errorhandler)

mongoose.connection.once('open', () => {
    https.createServer(httpsOptions, app).listen(8443, '0.0.0.0', () => {
        console.log(`HTTPS server running on https://api.atlaxiom.com`);
    });
})

mongoose.connection.on('error', err => {
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 
    'mongoErrLog.log')
})
