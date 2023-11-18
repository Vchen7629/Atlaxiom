const mongoose = require('mongoose');


const ownedCardSchema = new mongoose.Schema({
    card_name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        default: true
    },
    ownedprop: {
        type: Boolean,
        default: false
    },
    _id: false 
});

module.exports = ownedCardSchema;