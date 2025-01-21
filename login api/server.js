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
const PORT = process.env.PORT || 3005;

connectDB()
app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())


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
    app.listen(PORT, () => console.log(`server running on port http://localhost:${PORT}`))
})

mongoose.connection.on('error', err => {
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 
    'mongoErrLog.log')
})
