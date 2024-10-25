const mongoose = require("mongoose")
const ownedCardSchema = require("./OwnedCards")

const ownedDeckSchema = new mongoose.Schema({
    deck_name: {
        type: String,
        require: true
    },
    deck_desc: {
        type: String,
        require: false
    },
    createdOn: {
        type: String,
        default: null
    },
    total_cards_deck: {
        type: Number,
        default: 0
    },
    total_cards_main_deck: {
        type: Number,
        default: 0
    },
    total_cards_extra_deck: {
        type: Number,
        default: 0
    },
    total_cards_side_deck: {
        type: Number,
        default: 0
    },
    main_deck_cards: {
        type: [ownedCardSchema],
        default: []
    },
    extra_deck_cards: {
        type: [ownedCardSchema],
        default: []
    },
    side_deck_cards: {
        type: [ownedCardSchema],
        default: []
    }

})

module.exports = ownedDeckSchema;