const mongoose = require('mongoose')
const ownedCardSchema = require('./OwnedCards');
const ownedDeckSchema = require('./decks');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
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
    totalOwnedCards: {
        type: Number,
        default: 0
    },
    totalOwnedDecks: {
        type: Number,
        default: 0
    },
    ownedDecks: {
        type: [ownedDeckSchema],
        default: []
    },
    ownedCards: {
        type: [ownedCardSchema],
        default: []
    }
});

module.exports = userSchema