const mongoose = require("mongoose")
const deckCardSchema = require('./deckCardModel.js')


const ownedDeckSchema = new mongoose.Schema({
    favorite: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: String,
        require: true
    },
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
    lastUpdated: {
        type: String,
        default: null
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
        type: [deckCardSchema],
        default: []
    },
    extra_deck_cards: {
        type: [deckCardSchema],
        default: []
    },
    side_deck_cards: {
        type: [deckCardSchema],
        default: []
    }

})

module.exports = ownedDeckSchema;