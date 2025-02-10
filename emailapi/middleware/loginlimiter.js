const ratelimit = require('express-rate-limit')

const LoginLimiter = ratelimit({
    windowMs: 60 * 1000, //1 minute
    max: 20, // limit each IP to 5 requests per window per minute
    message: 
        { message: "Too many login attempts from this IP, please try again after a minute"},
    handler: (req, res, next, options) => {
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true, // Return rate limit info in the `Ratelimit-*` headers
    legacyHeaders: false, // Disable the `X-Ratelimit-*` headers
    keyGenerator: (req) => req.ip

})

module.exports = LoginLimiter