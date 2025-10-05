require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const errorhandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = 3000
const connectDB = require('./config/dbConn')
const { authMiddleware } = require('./middleware/auth_middleware')
const environment = 'production';

app.use(cors(corsOptions))
app.use(logger)
app.use(express.json())
app.use(cookieParser())

app.get("/", (_, res) => res.send("Hello from Lambda!"));

app.use("/health", (_, res) => {
    res.status(200).send('OK');
})

// 
app.use('/auth', require('./routes/authRoutes'))

app.use('/user', require('./routes/userRoutes'))

app.use('/card', authMiddleware, require('./routes/ownedCardRoutes'))

app.use('/deck', authMiddleware, require('./routes/deckRoutes'))

app.use('/google', require("./routes/googleOauthRoutes"))

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

if (environment !== 'production') {
    const startServer = async () => {
        try {
            await connectDB();

            app.listen(PORT, '0.0.0.0', () => {
                console.log(`Development server running on http://localhost:${PORT}`);
            });
        } catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    }

    startServer();
}

module.exports = app;