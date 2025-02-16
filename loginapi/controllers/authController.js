const { User } = require('../../loginapi/models/genmodels.js');
const bcrypt = require('bcrypt')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
require('dotenv').config();

const getSecret = (filePath, envVar) => {
    if (filePath && fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf8').trim();
    } else {
        console.log("error 1")
    }
    
    return envVar || null;
};

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    
    if (!username && !password) {
        return res.status(400).json({ message: 'No Username and Password entered, please input a Username and Password' })
    }   

    if (!username) {
        return res.status(400).json({ message: 'No Username entered, please input a Username' })
    } 

    if (!password) {
        return res.status(400).json({ message: 'No Paasword entered, please input a Password' })
    }   

    const foundUser = await User.findOne({ username }).exec()

    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: "Invalid Username" })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'Invalid Password' })

    // Read secrets
    const accessTokenSecret = getSecret(process.env.ACCESS_TOKEN_SECRET_FILE, process.env.ACCESS_TOKEN_SECRET);
    const refreshTokenSecret = getSecret(process.env.REFRESH_TOKEN_SECRET_FILE, process.env.REFRESH_TOKEN_SECRET);

    // Ensure secrets are available
    if (!accessTokenSecret || !refreshTokenSecret) {
        throw new Error('Access or Refresh token secrets are missing.');
    }

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "email": foundUser.email,
                "username": foundUser.username,
                "userId": foundUser._id
            }
        },
        accessTokenSecret,
        { expiresIn: '24h' }
    )

    res.cookie('accessToken', accessToken, {
        domain: '.atlaxiom.com',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 15 * 60 * 1000, 
    });

    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        refreshTokenSecret,
        { expiresIn: '7d' }
    )

    res.cookie('jwt', refreshToken, {
        domain: '.atlaxiom.com',
        httpOnly: true, 
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    // Send accessToken containing username and roles 
    res.json({accessToken, userId: foundUser._id, username: foundUser.username })
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized no cookies' })

    const refreshToken = cookies.jwt

    const refreshTokenSecret = getSecret(process.env.REFRESH_TOKEN_SECRET_FILE, process.env.REFRESH_TOKEN_SECRET);
    const accessTokenSecret = getSecret(process.env.ACCESS_TOKEN_SECRET_FILE, process.env.ACCESS_TOKEN_SECRET);
    
    if (!refreshTokenSecret) {
        return res.status(500).json({ message: 'Refresh token secret is missing' });
    }

    jwt.verify(refreshToken, refreshTokenSecret, asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const searchQuery = decoded.email 
                ? { email: decoded.email }
                : { username: decoded.username };

            const foundUser = await User.findOne(searchQuery).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized No user found' })
            
            if (foundUser.authType === "google") {
                jwt.sign(
                    {
                        "UserInfo": {
                            "userId": foundUser._id,
                            "email": foundUser.email,
                            "username": foundUser.username
                        }
                    },
                    accessTokenSecret,
                    { expiresIn: "24h"}
                )
                res.json({ username: foundUser.username, userId: foundUser._id, email: foundUser.email })
            } else {
                jwt.sign(
                    {
                        "UserInfo": {
                            "userId": foundUser._id,
                            "email": foundUser.email,
                            "username": foundUser.username,
                        }
                    },
                    accessTokenSecret,
                    { expiresIn: '24h' }
                )
                res.json({ userId: foundUser._id, username: foundUser.username, email: foundUser.email })
            }
        })
    )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    refresh,
    logout
}