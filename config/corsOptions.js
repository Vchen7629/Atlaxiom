const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexof(origin) !== -1 /*checks to see if the origin or http address is in the allowedOrigin array */
        || !origin) /*or function that lets us use 3rd party software to access the api */ {
            callback(null, true) 
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true, 
    optionsSuccessStatus: 200,
}

module.exports = corsOptions