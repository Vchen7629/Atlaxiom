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
    creation: {
        type: String,
        required: true
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
});

module.exports = userSchema