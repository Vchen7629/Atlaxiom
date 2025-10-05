
// This is middleware for checking sessionID in the database and returning
const expressAsyncHandler = require('express-async-handler');
const { Session } = require('../models/genmodels.js');

// userID to be used in requests
export const authMiddleware = expressAsyncHandler(async (req, res, next) => {
    const { sessionId } = req.cookies;

    if (!sessionId) {
        return res.status(401).json({ message: 'Unauthorized no session cookie found!@!' })
    }

    // Find Session in Database
    const session = await Session.findOne({ session_id: sessionId}).exec()

    if (!session || session.expires_at < new Date()) {
        return res.status(401).json({ message: 'Unauthorized: invalid or expired session' });
    }

    // attaches userId to request so you can use it in the routes
    req.userId = session.user_id;
    next();
})