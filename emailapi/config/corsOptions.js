const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, origin) 
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Range', 'Authorization'],
    exposedHeaders: ['set-cookie'],
    optionsSuccessStatus: 200,
}

module.exports = corsOptions