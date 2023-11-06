const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const OwnedCardsSchema = new mongoose.schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            default: true
        },
        owned: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

OwnedCardsSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums', 
    start_seq: 500
})

module.exports = mongoose.model('OwnedCards', OwnedCardsSchema)