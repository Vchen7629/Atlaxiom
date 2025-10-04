const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: function() {  return this.authType === 'local'; }
    },
    authType: {
        type: String,
        required: true,
        enum: ['local', 'google']
    },
    creation: {
        type: String,
        required: true
    },
    lastUsernameUpdated: {
        type: String,
        default: null
    },
    lastCardUpdated: {
        type: String,
        default: null
    },
    lastUpdated: {
        type: String,
        default: null
    },
    lastAdded: {
        type: String, 
        default: null
    },
    lastDeleted: {
        type: String,
        default: null
    },
    active: {
        type: Boolean,
        default: true
    },
    totalOwnedCards: {
        type: Number,
        default: 0
    },
    totalOwnedDecks: {
        type: Number,
        default: 0
    },
    uniqueCards: {
        type: Number,
        default: 0
    }
});

module.exports = userSchema