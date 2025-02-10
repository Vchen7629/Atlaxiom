const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    sessionId: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
        expires: 86400 
    }
})

module.exports = mongoose.model('PasswordResetToken', tokenSchema);

