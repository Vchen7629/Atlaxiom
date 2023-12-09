const asyncHandler = require("express-async-handler");
const { User } = require("../models/genmodels");

// @desc Create a new owned Deck
// @route POST /:id
// @access Public
const createNewDeck = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { deck_name } = req.body;

    if (!id || !deck_name) {
        return res.status(400).json({ message: "User ID and deck name are required" });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.ownedDecks = user.ownedDecks || [];

    const duplicateDeck = user.ownedDecks.find((deck) => deck.deck_name === deck_name);

    if (duplicateDeck) {
        return res.status(409).json({ message: "Duplicate deck name for this user found" });
    }

    user.totalOwnedDecks = (user.totalOwnedDecks || 0) + 1;

    const newDeck = {
        deck_name: deck_name,
    };

    user.ownedDecks.push(newDeck);

    await user.save();

    res.status(201).json({ message: `New deck named ${deck_name} created for user ${user.username}`});

});

// @desc Get all decks for the user
// @route GET /:id
// @access Public
const getAllDecksforUser = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ message: 'user id is required' });
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!user.ownedDecks || user.ownedDecks.length === 0) {
        return res.status(404).json({ message: 'Owned Decks not found for the user' });
    }
    
    res.json({ id, username: user.username, ownedDecks: user.ownedDecks});
})

// @desc Get a specific deck for a user
// @route GET /:id
// @access Public
const getSpecificDeckforUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { deck_name } = req.body

    if (!id || !deck_name) {
        return res.status(400).json({ message: "User ID and deck name are required" });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }


    const specificDeck = user.ownedDecks.find(deck => deck.deck_name === deck_name);

    if (!specificDeck) {
        return res.status(404).json({ message: "Deck not found for the specified user and deck name" });
    }

    res.json(specificDeck);
});

// @desc Add a card to the deck
// @route PATCH /:id
// @access Public
const addCardtoDeck = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { deck_name, deck_cards } = req.body

    if (!id || !deck_name || !deck_cards) {
        return res.status(400).json({ message: "no userid, card-data, and/or deck name provided" })
    }

    const invalidDeckCards = deck_cards.filter(deck => !deck.card_name || !deck.image_url || !deck.type || !deck.race || !deck.desc);

    if (invalidDeckCards.length > 0) {
        return res.status(400).json({ message: 'Missing either card_name, image_url, type, race, or desc params in input' });
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }

    const selectedDeck = user.ownedDecks.find(deck => deck.deck_name === deck_name);

    if (!selectedDeck) {
        return res.status(404).json({ message: "Deck name not found for this user" })
    }

    const existingCard = selectedDeck.deck_cards.find(card => card.card_name === deck_cards[0].card_name);

    if (existingCard) {
        return res.status(409).json({ message: `Card with the name ${deck_cards[0].card_name} already exists in the deck`});
    }

    const cardsToAdd = deck_cards.map(card => ({ ...card, ownedamount: 1 }));

    selectedDeck.deck_cards.push(...cardsToAdd);

    selectedDeck.total_cards_deck = (selectedDeck.total_cards_deck || 0) + deck_cards.length;

    await user.save();

    res.status(200).json({ message: `Card with card name ${deck_cards[0].card_name} added to the deck with name ${deck_name} for user called ${user.username}`})
})

// @desc Delete a card from the deck
// @route Delete /:id
// @access Public
const DeleteCardfromDeck = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { card_name, deck_name } = req.body

    if (!id || !card_name || !deck_name) {
        return res.status(400).json({ message: 'User ID, card name, and deck name are required' });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const selectedDeck = user.ownedDecks.find(deck => deck.deck_name === deck_name);

    if (!selectedDeck) {
        return res.status(404).json({ message: 'Deck name not found for this user' });
    }

    const cardIndex = selectedDeck.deck_cards.findIndex(deck => deck.card_name === card_name);

    if (cardIndex === -1) {
        return res.status(404).json({ message: 'Owned card not found' });
    }

    selectedDeck.deck_cards.splice(cardIndex, 1);

    selectedDeck.total_cards_deck = (selectedDeck.total_cards_deck || 0) - 1;

    await user.save();

    res.status(200).json({ message: `Card ${card_name} deleted from the deck ${deck_name} for user ${user.username} successfully` });

})

const DeleteDeck = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { deck_name } = req.body

    if (!id || !deck_name) {
        return res.status(400).json({ message: "userid and/or deck_name are missing "})
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }

    const DeckIndex = user.ownedDecks.findIndex(deck => deck.deck_name === deck_name);

    if (DeckIndex === -1) {
        return res.status(404).json({ message: 'Deck not found' });
    }

    user.ownedDecks.splice(DeckIndex, 1);

    user.totalOwnedDecks = (user.totalOwnedDecks || 0) - 1;
    
    await user.save();

    res.status(200).json({ message: `Deck ${deck_name} deleted for user ${user.username} successfully` });
})

module.exports = {
    createNewDeck,
    getAllDecksforUser,
    getSpecificDeckforUser,
    addCardtoDeck,
    DeleteCardfromDeck,
    DeleteDeck
}