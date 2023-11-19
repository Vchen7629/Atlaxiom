const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) { /*checks to see if the origin or http address is in the allowedOrigin array */
            callback(null, true) 
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true, 
    optionsSuccessStatus: 200,
}

module.exports = corsOptions