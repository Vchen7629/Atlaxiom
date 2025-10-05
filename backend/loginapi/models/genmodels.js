const mongoose = require('mongoose');
const ownedCardSchema = require('./OwnedCards.js');
const userSchema = require('./User');
const ownedDeckSchema = require('./decks.js');
const SessionSchema = require('./sessions.js');

const User = mongoose.model('User', userSchema);
const OwnedCard = mongoose.model('OwnedCards', ownedCardSchema);
const Deck = mongoose.model('Deck', ownedDeckSchema);
const Session = mongoose.model('Session', SessionSchema)

module.exports = {
    User,
    OwnedCard,
    Deck,
    Session
};