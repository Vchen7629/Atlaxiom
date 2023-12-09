const mongoose = require("mongoose")
const ownedCardSchema = require("./OwnedCards")

const ownedDeckSchema = new mongoose.Schema({
    deck_name: {
        type: String,
        require: true
    },
    total_cards_deck: {
        type: Number,
        default: 0
    },
    deck_cards: {
        type: [ownedCardSchema],
        default: []
    }
})

module.exports = ownedDeckSchema;