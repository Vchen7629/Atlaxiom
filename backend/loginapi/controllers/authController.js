const { User, Session } = require('../models/genmodels.js');
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config();

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    
    if (!username && !password) {
        return res.status(400).json({ message: 'No Username and Password entered, please input a Username and Password' })
    } else if (!username) {
        return res.status(400).json({ message: 'No Username entered, please input a Username' })
    } else if (!password) {
        return res.status(400).json({ message: 'No Paasword entered, please input a Password' })
    }  

    // This checks to see if the username exists in db
    const foundUser = await User.findOne({ username }).exec()
    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: "Invalid Username" })
    }

    // This checks to see if password matches the user in database
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) {
        return res.status(401).json({ message: 'Invalid Password' })
    }

    const sessionId = uuidv4(); // generate SessionID
    const expire =  new Date(Date.now() + 60 * 60 * 1000); // create a expire timestamp 1 hour from now
    // session object to be saved to database
    const sessionObject = {
        session_id: sessionId,
        user_id: foundUser._id,
        expires_at: expire
    }

    const session = await Session.create(sessionObject)

    res.cookie('sessionId', session.session_id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
    })

    // Checks to see if session was created successfully in db
    if (session) {
        res.status(200).json({ 
            message: "Login successful",
            authenticated: true
        })
    } else {
        res.status(500).json({ message: "Session could not be created"})
    }
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public 
const refresh = asyncHandler(async(req, res) => {
    const { sessionId } = req.cookies

    // error handling: checking to see if session cookies exist
    if (!sessionId) {
        return res.status(401).json({ message: 'Unauthorized no session cookie found on refresh' })
    }
    
    // Find Session in Database
    const session = await Session.findOne({ session_id: sessionId}).exec()

    // potential race condition, as the user refreshes, session could expire and return 401,
    if (!session || session.expires_at < new Date()) {
        return res.status(401).json({ message: 'Unauthorized: invalid or expired session' });
    }

    // Verify user still exists and is active
    const foundUser = await User.findById(session.user_id).exec();
    
    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: 'Unauthorized: user not found' });
    }

    // Update and Extend by 1 hour
    session.expires_at = new Date(Date.now() + 60 * 60 * 1000); 
    const update = await session.save(); // update mongodb session expire time

    if (!update) {
        return res.status(500).json({ message: 'error updating session in database'})
    } 

    // Update cookie
    res.cookie('sessionId', session.session_id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
    });
    
    res.status(200).json({ 
        message: 'Session refreshed successfully',
        sessionValid: true
    });
})

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = asyncHandler(async (req, res) => {
    const cookies = req.cookies // check for cookies

    // check for the sessionId cookie
    if (!cookies?.sessionId) {
        return res.sendStatus(204) //No content
    }

    // Try to delete Session from database
    try {
        await Session.deleteOne({ session_id: cookies.sessionId })
    } catch (err) {
        console.error('Error removing session from database:', err);
    }

    res.clearCookie('sessionId', { 
        httpOnly: true, 
        sameSite: 'strict', 
        secure: process.env.NODE_ENV === 'production'
    })

    res.status(200).json({ message: "Login successful" })
})

module.exports = {
    login,
    refresh,
    logout
}