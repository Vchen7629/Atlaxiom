const jwt = require('jsonwebtoken')
const fs = require('fs')

const getSecret = (filePath, envVar) => {
    if (filePath && fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8').trim();
    }
    return envVar || null;
};

const accessTokenSecret = getSecret(process.env.ACCESS_TOKEN_SECRET_FILE, process.env.ACCESS_TOKEN_SECRET);

if (!accessTokenSecret) {
    throw new Error('Access token secret is missing.');
}

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify( token, accessTokenSecret, (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.user = decoded.UserInfo.username
            req.roles = decoded.UserInfo.roles
            next()
        }
    )
}

module.exports = verifyJWT 