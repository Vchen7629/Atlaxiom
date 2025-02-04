require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs')
const { User } = require('../../loginapi/models/genmodels');
const asyncHandler = require('express-async-handler')

const getSecret = (filePath, envVar) => {
    if (filePath && fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf8').trim();
    } else {
        console.log("error 1")
    }
    
    return envVar || null;
};

// @desc Login using Google Oauth
// @route POST /google/auth/login
// @access Public
const OauthLogin = asyncHandler(async (req, res) => {
    const { access_token } = req.body;
    const accessTokenSecret = getSecret(process.env.ACCESS_TOKEN_SECRET_FILE, process.env.ACCESS_TOKEN_SECRET);
    const refreshTokenSecret = getSecret(process.env.REFRESH_TOKEN_SECRET_FILE, process.env.REFRESH_TOKEN_SECRET);

     // Ensure secrets are available
    if (!accessTokenSecret || !refreshTokenSecret) {
        throw new Error('Access or Refresh token secrets are missing.');
    }

    if (!access_token) {
        return res.status(400).json({ message: 'Access token is required' });
    }

    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { 'Authorization': `Bearer ${access_token}` }
    });

    if (!userInfoResponse.ok) {
        throw new Error('Failed to get user info');
    }

    const userData = await userInfoResponse.json();
    const { email, name } = userData;
    
    let user = await User.findOne({ email }).lean().exec();

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const creationDate = `${formattedDate}`

    if (!user) {
        user = await User.create({ 
            username: name,
            email: email,
            creation: creationDate,
            authType: "google",
            lastUpdated: null,
            lastUsernameUpdated: creationDate,
            uniqueCards: 0,
        })
    }

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "email": email,
                "username": name,
                "userId": user._id
            }
        },
        accessTokenSecret,
        { expiresIn: '24h' }
    )

    
    res.cookie('accessToken', accessToken, {
        domain: '.atlaxiom.com',
        httpOnly: true,
        secure:  true,
        sameSite: 'none',
        maxAge: 15 * 60 * 1000, 
    });

    const refreshToken = jwt.sign(
        { "email": email },
        refreshTokenSecret,
        { expiresIn: '7d' }
    )

    res.cookie('jwt', refreshToken, {
        domain: '.atlaxiom.com',
        httpOnly: true,
        secure:  true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken, refreshToken, userId: user._id, username: name, email })
})


module.exports = { OauthLogin }