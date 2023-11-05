const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const errorhandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT | 3000;

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public'))) /*code for telling the program to fetch static css files from the public folder */

app.use('/', require('./routes/root'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: "404 not found"})
    }  else {
        res.type('txt').send('404 not found')
    }

})

app.use(errorhandler)

app.listen(PORT, () => console.log(`server running on port http://localhost:${PORT}`))

