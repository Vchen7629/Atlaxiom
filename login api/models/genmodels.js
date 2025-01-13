const mongoose = require('mongoose');
const ownedCardSchema = require('./OwnedCards.js');
const userSchema = require('./User');
const ownedDeckSchema = require('./decks.js');

const User = mongoose.model('User', userSchema);
const OwnedCard = mongoose.model('OwnedCards', ownedCardSchema);
const Deck = mongoose.model('Deck', ownedDeckSchema)

module.exports = {
    User,
    OwnedCard,
    Deck,
};