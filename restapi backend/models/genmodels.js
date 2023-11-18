const mongoose = require('mongoose');
const ownedCardSchema = require('./OwnedCards.js');
const userSchema = require('./User');

const OwnedCard = mongoose.model('OwnedCards', ownedCardSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    OwnedCard,
    User
};