const mongoose = require('mongoose');


const ownedCardSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: false,
    },
    card_name: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false
    },
    race: {
        type: String,
        required: false
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
        required: false,
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
        required: false
    },
    ownedamount: {
        type: Number,
        default: 0
    },
    set_name: {
        type: String,
        required: false
    },
    rarity: {
        type: String,
        required: false
    },
    set_code: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    addedOn: {
        type: String,
        default: null
    }   
});

module.exports = ownedCardSchema;