const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) { /*checks to see if the origin or http address is in the allowedOrigin array */
            callback(null, origin) 
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Range', 'Authorization'],
    optionsSuccessStatus: 200,
}

module.exports = corsOptions