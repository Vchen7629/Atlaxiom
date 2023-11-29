const mongoose = require('mongoose')
const ownedCardSchema = require('./OwnedCards')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "Member"
    }],
    active: {
        type: Boolean,
        default: true
    },

    ownedCards: {
        type: [ownedCardSchema],
        default: []
    }
});

module.exports = userSchema