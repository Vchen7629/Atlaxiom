const ratelimit = require('express-rate-limit')
const { logEvents } = require('./logger')

const LoginLimiter = ratelimit({
    windowMs: 60 * 1000, //1 minute
    max: 5, // limit each IP to 5 requests per window per minute
    message: 
        { message: "Too many login attempts from this IP, please try again after a minute"},
    handler: (req, res, next, options) => {
        logEvents(`Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "errLog.log")
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true, // Return rate limit info in the `Ratelimit-*` headers
    legacyHeaders: false, // Disable the `X-Ratelimit-*` headers
})

module.exports = LoginLimiter