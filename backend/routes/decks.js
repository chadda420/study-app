const express = require('express')
const router = express.Router()
const Deck = require('../models/Deck')

router.get('/', async (req,res) => {
    try{
        const decks = await Deck.find({})
        res.json(decks)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})



router.post('/', async (req, res) => {
    const { name } = req.body; 
    if (!name) {
        return res.status(400).json({ message: 'Deck name is required' });
    }

    const newDeck = new Deck({ name }); // new Deck model

    try {
        const savedDeck = await newDeck.save(); // saves new deck
        res.status(201).json(savedDeck); // 201 Created
    } catch (err) {
        // Handle duplicate name error
        if (err.code === 11000) { // MongoDB duplicate key error code
            return res.status(409).json({ message: 'A deck with this name already exists.' });
        }
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { question, answer } = req.body;
    try {
        const deck = await Deck.findById(req.params.id);
        if (!deck) return res.status(404).json({ message: 'Deck not found' });

        const newCard = { question, answer, id: Date.now() }; 
        deck.cards.push(newCard);
        await deck.save();

        res.status(201).json(deck);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:deckId/cards/clear', async (req, res) => {
    try {
        const deck = await Deck.findById(req.params.deckId);
        if (!deck) return res.status(404).json({ message: 'Deck not found' });

        deck.cards = [];
        await deck.save();
        res.status(200).json(deck);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;