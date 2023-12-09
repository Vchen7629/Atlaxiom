const mongoose = require('mongoose');


const ownedCardSchema = new mongoose.Schema({
    card_name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    attribute: {
        type: String,
        required: false
    },
    archetype: {
        type: String,
        required: false
    },
    level: {
        type: Number,
        required: false
    },
    linkval: {
        type: Number,
        required: false
    },
    scale: {
        type: Number,
        required: false
    },
    atk: {
        type: Number,
        required: false
    },
    def: {
        type: Number,
        required: false
    },
    desc: {
        type: String,
        required: true
    },
    pend_desc: {
        type: String,
        required: false
    },
    monster_desc: {
        type: String,
        required: false
    },
    image_url: {
        type: String,
        required: true
    },
    ownedamount: {
        type: Number,
        default: 0
    }

});

module.exports = ownedCardSchema;