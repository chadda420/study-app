const mongoose = require('mongoose')

const CardSchema = new mongoose.Schema({
    question: {
        type: String,
        required:true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
})

const DeckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    cards: [CardSchema],
        createdAt:{
            type:Date,
            default: Date.now
        }

    })


module.exports = mongoose.model('Deck', DeckSchema)