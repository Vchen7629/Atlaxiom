const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema({
    session_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true,
    },
    expires_at: {
        type: Date,
        required: true
    }
})

module.exports = SessionSchema