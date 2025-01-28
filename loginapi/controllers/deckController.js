const asyncHandler = require("express-async-handler");
const { User, Deck } = require("../models/genmodels");

// @desc Create a new owned Deck
// @route POST /
// @access Public
const createNewDeck = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.ownedDecks = user.ownedDecks || [];

    user.totalOwnedDecks = (user.totalOwnedDecks || 0) + 1;

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    const deckObject = {
        favorite: false,
        user_id: id,
        deck_name: "Unnamed Deck",
        deck_desc: "a new deck",
        createdOn: `${formattedDate}`,
        lastUpdated:`${formattedDate}`,
        main_deck_cards: [], 
        extra_deck_cards: [], 
        side_deck_cards: [], 
    };

    const deck = await Deck.create(deckObject)

    await user.save();

    if (deck) {
        res.status(201).json({ 
            message: `New deck named ${deck.deck_name} created for user ${user.username}`,
            deck: deck
        });
    } else {
        res.status(400).json({ message: "Invalid deck data recieved"})
    }

});

// @desc Duplicate and create a new owned Deck copying the original deck data
// @route POST /duplicate/:id
// @access Public
const createDuplicateDeck = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { deckId } = req.body

    if (!id || !deckId ) {
        return res.status(400).json({ message: "User ID and DeckId are required" });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const originalDeck = await Deck.findOne({ user_id: id, _id: deckId})
    if (!originalDeck) {
        return res.status(405).json({ message: "Original deck not found" });
    }

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    const deckObject = {
        favorite: false,
        user_id: id,
        deck_name: originalDeck.deck_name,
        deck_desc: originalDeck.deck_desc,
        createdOn: formattedDate,
        lastUpdated: formattedDate,
        main_deck_cards: [...originalDeck.main_deck_cards], 
        extra_deck_cards: [...originalDeck.extra_deck_cards], 
        side_deck_cards: [...originalDeck.side_deck_cards],
    };

    const newDeck = await Deck.create(deckObject);

    user.ownedDecks = user.ownedDecks || [];
    user.ownedDecks.push(newDeck._id)
    user.totalOwnedDecks = (user.totalOwnedDecks || 0) + 1;
    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save();

    if (newDeck) {
        res.status(201).json({ 
            message: `New deck named ${newDeck.deck_name} duplicated for user ${user.username}`,
            deck: newDeck
        });
    } else {
        res.status(400).json({ message: "Invalid deck data recieved"})
    }

});

// @desc Get all decks for the user
// @route GET /:id
// @access Public
const getAllDecksforUser = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ message: 'user id is required' });
    }

    const alldecks = await Deck.find({ user_id: id})
    
    res.json({ id , ownedDecks: alldecks});
})

// @desc Get a specific deck for a user
// @route GET /specific/:id/:DeckId
// @access Public
const getSpecificDeckforUser = asyncHandler(async (req, res) => {
    const { id, deckId } = req.params

    if (!id || !deckId) {
        return res.status(400).json({ message: "User ID and deck name are required" });
    }

    const deck = await Deck.find({ user_id: id, _id: deckId })

    if (!deck) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(deck);
});

// @desc Favorite a deck
// @route PATCH /favorite/:id
// @access Public
const makeFavoriteDeck = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { deckId } = req.body

    if (!id || !deckId) {
        return res.status(400).json({ message: "No UserId or Deck Id provided"})
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const deck = await Deck.findOne({ user_id: id, _id: deckId})

    if (!deck) {
        return res.status(405).json({ message: `Deck of ID ${deckId} not found for this user` });
    }

    deck.favorite = true;

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save();
    await deck.save();

    res.status(200).json({ message: `Deck ${deck.deck_name} favorited` })

})

// @desc Add a card to the main deck
// @route PATCH /maindeck/:id
// @access Public
const addCardtoMainDeck = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { deckId, main_deck_cards } = req.body

    if (!id || !deckId || !main_deck_cards) {
        return res.status(400).json({ message: "no userid, card-data, and/or deck ID provided" })
    }

    if (!Array.isArray(main_deck_cards)) {
        return res.status(400).json({ message: "main_deck_cards should be an array" });
    }

    const invalidDeckCards = main_deck_cards.filter(deck => !(deck.card_name || deck.name));

    if (invalidDeckCards.length > 0) {
        return res.status(400).json({ message: 'Missing card names in input' });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const deck = await Deck.findOne({ user_id: id, _id: deckId})

    if (!deck) {
        return res.status(404).json({ message: `Deck of ID ${deckId} not found for this user` });
    }

    if (!Array.isArray(deck.main_deck_cards)) {
        deck.main_deck_cards = [];
    }

    const existingCardNames = deck.main_deck_cards.map(card => card.card_name);
    const cardsToAdd = main_deck_cards.filter(card => !existingCardNames.includes(card.card_name));

    if (cardsToAdd.length === 0) {
        return res.status(409).json({ message: 'All cards in the input already exist in the deck' });
    }

    const totalCardsToAdd = cardsToAdd.reduce((sum, card) => sum + (card.cardInDeckOwnedAmount || 0), 0);

    if ((deck.total_cards_main_deck || 0) + totalCardsToAdd > 60) {
        return res.status(400).json({ message: 'main deck limit of 60 cards will be exceeded if this card is added' });
    }

    deck.main_deck_cards.push(...cardsToAdd);

    deck.total_cards_main_deck = (deck.total_cards_main_deck || 0) + totalCardsToAdd;

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save();
    await deck.save();

    res.status(200).json({ 
        message: `${cardsToAdd.length} card(s) added to the main deck.`,
        addedCards: cardsToAdd.map(card => card.card_name)
    })
})

// @desc Add a card to the extra deck
// @route PATCH /extradeck/:id
// @access Public
const addCardtoExtraDeck = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { deckId, extra_deck_cards } = req.body

    if (!id || !deckId || !extra_deck_cards) {
        return res.status(400).json({ message: "no userid, card-data, and/or deckId provided" })
    }

    if (!Array.isArray(extra_deck_cards)) {
        return res.status(400).json({ message: "extra_deck_cards should be an array" });
    }

    const invalidDeckCards = extra_deck_cards.filter(deck => !(deck.card_name || deck.name));

    if (invalidDeckCards.length > 0) {
        return res.status(400).json({ message: 'Missing card_name' });
    }

    const user = await User.findById(id)
    const deck = await Deck.findOne({ user_id: id, _id: deckId})

    if (!deck) {
        return res.status(404).json({ message: "Deck name not found for this user" })
    }

    if (!Array.isArray(deck.extra_deck_cards)) {
        deck.extra_deck_cards = [];
    }

    const existingCardNames = deck.extra_deck_cards.map(card => card.card_name);
    const cardsToAdd = extra_deck_cards.filter(card => !existingCardNames.includes(card.card_name));

    if (cardsToAdd.length === 0) {
        return res.status(409).json({ message: 'All cards in the input already exist in the deck' });
    }

    const totalCardsToAdd = cardsToAdd.reduce((sum, card) => sum + (card.cardInDeckOwnedAmount || 0), 0);

    if ((deck.total_cards_extra_deck || 0) + totalCardsToAdd > 15) {
        return res.status(400).json({ message: 'extra deck limit of 15 cards will be exceeded if this card is added' });
    }

    deck.extra_deck_cards.push(...cardsToAdd);
    deck.total_cards_extra_deck = (deck.total_cards_extra_deck || 0) + totalCardsToAdd;


    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save();
    await deck.save();

    res.status(200).json({ message: `Card with card name ${extra_deck_cards[0].card_name} added to the extra deck of deck with name${deckId} for user called ${user.username}`})
})

// @desc Add a card to the side deck
// @route PATCH /sidedeck/:id
// @access Public
const addCardtoSideDeck = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { deckId, side_deck_cards } = req.body

    if (!id || !deckId || !side_deck_cards) {
        return res.status(400).json({ message: "no userid, card-data, and/or deckId provided" })
    }

    if (!Array.isArray(side_deck_cards)) {
        return res.status(400).json({ message: "side_deck_cards should be an array" });
    }

    const invalidDeckCards = side_deck_cards.filter(deck => !(deck.card_name || deck.name));

    if (invalidDeckCards.length > 0) {
        return res.status(400).json({ message: 'Missing either card_name, image_url, type, race, or desc params in input' });
    }

    const user = await User.findById(id)
    const deck = await Deck.findOne({ user_id: id, _id: deckId})

    if (!deck) {
        return res.status(404).json({ message: "Deck name not found for this user" })
    }

    const existingCardNames = deck.extra_deck_cards.map(card => card.card_name);
    const cardsToAdd = side_deck_cards.filter(card => !existingCardNames.includes(card.card_name));

    if (cardsToAdd.length === 0) {
        return res.status(409).json({ message: 'All cards in the input already exist in the deck' });
    }

    const totalCardsToAdd = cardsToAdd.reduce((sum, card) => sum + (card.cardInDeckOwnedAmount || 0), 0);

    if ((deck.total_cards_side_deck || 0) + totalCardsToAdd > 15) {
        return res.status(400).json({ message: 'side deck limit of 15 cards will be exceeded if this card is added' });
    }

    deck.side_deck_cards.push(...cardsToAdd);
    deck.total_cards_side_deck = (deck.total_cards_side_deck || 0) + totalCardsToAdd;


    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save();
    await deck.save();

    res.status(200).json({ message: `Card with card name ${side_deck_cards[0].card_name} added to the side deck of deck with name ${deckId} for user called ${user.username}`})
})


// @desc Modify the amount of a specific card in the main deck
// @route PATCH /maindeck/update/:id
// @access Public
const modifyCardAmountinMainDeck = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { deckId, cardUpdates } = req.body;

    if (!id || !deckId || !Array.isArray(cardUpdates)) {
        return res.status(400).json({ message: 'User ID, deck ID, and an array of card updates are required' });
    }

    const user = await User.findById(id);
    const deck = await Deck.findOne({ user_id: id, _id: deckId})

    if (!deck) {
        return res.status(404).json({ message: 'Deck not found for user' });
    }

    cardUpdates.forEach(({ card_name, modifyAmount }) => {
        if (!card_name || isNaN(modifyAmount)) {
            return res.status(400).json({ message: 'Each card update must have a valid card_name and modifyAmount' });
        }

        const card = deck.main_deck_cards.find(card => card.card_name === card_name);

        if (!card) {
            return res.status(404).json({ message: `Card with name ${card_name} not found in main deck` });
        }

        card.cardInDeckOwnedAmount = modifyAmount;
    });

    deck.total_cards_main_deck = deck.main_deck_cards.reduce((total, card) => total + (card.cardInDeckOwnedAmount || 0), 0);

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save()
    await deck.save()

    const updatedCardsSummary = cardUpdates.map(({ card_name, modifyAmount }) => ({
        card_name,
        modifyAmount,
    }));

    res.json({ 
        message: `Cards updated successfully for msin deck in deck ${deckId}`, 
        updatedCards: updatedCardsSummary, 
    });
})

// @desc Modify cards in the extra deck
// @route PATCH /extradeck/update/:id
// @access Public
const modifyCardAmountinExtraDeck = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { deckId, cardUpdates } = req.body;

    if (!id || !deckId || !Array.isArray(cardUpdates)) {
        return res.status(400).json({ message: 'User ID, deck ID, and an array of card updates are required' });
    }

    const user = await User.findById(id);
    const deck = await Deck.findOne({ user_id: id, _id: deckId})

    if (!deck) {
        return res.status(404).json({ message: 'Deck not found for user' });
    }

    cardUpdates.forEach(({ card_name, modifyAmount }) => {
        if (!card_name || isNaN(modifyAmount)) {
            return res.status(400).json({ message: 'Each card update must have a valid card_name and modifyAmount' });
        }

        const card = deck.extra_deck_cards.find(cards => cards.card_name === card_name);

        if (!card) {
            return res.status(404).json({ message: `Card with name ${card_name} not found in main deck` });
        }

        card.cardInDeckOwnedAmount = modifyAmount;
    });

    deck.total_cards_extra_deck = deck.extra_deck_cards.reduce((total, card) => total + (card.cardInDeckOwnedAmount || 0), 0);

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save()
    await deck.save()

    const updatedCardsSummary = cardUpdates.map(({ card_name, modifyAmount }) => ({
        card_name,
        modifyAmount,
    }));

    res.json({ 
        message: `Cards updated successfully for extra deck in deck ${deckId}`, 
        updatedCards: updatedCardsSummary, 
    });
})

// @desc Modify the cards in side deck
// @route PATCH /sidedeck/update/:id
// @access Public
const modifyCardAmountinSideDeck = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { deckId, cardUpdates } = req.body;

    if (!id || !deckId || !Array.isArray(cardUpdates)) {
        return res.status(400).json({ message: 'User ID, deck ID, and an array of card updates are required' });
    }

    const user = await User.findById(id);
    const deck = await Deck.findOne({ user_id: id, _id: deckId})

    if (!deck) {
        return res.status(404).json({ message: 'Deck not found for user' });
    }

    cardUpdates.forEach(({ card_name, modifyAmount }) => {
        if (!card_name || isNaN(modifyAmount)) {
            return res.status(400).json({ message: 'Each card update must have a valid card_name and modifyAmount' });
        }

        const card = deck.side_deck_cards.find(cards => cards.card_name === card_name);

        if (!card) {
            return res.status(404).json({ message: `Card with name ${card_name} not found in main deck` });
        }

        card.cardInDeckOwnedAmount = modifyAmount;
    });

    deck.total_cards_side_deck = deck.side_deck_cards.reduce((total, card) => total + (card.cardInDeckOwnedAmount || 0), 0);

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save()
    await deck.save()

    const updatedCardsSummary = cardUpdates.map(({ card_name, modifyAmount }) => ({
        card_name,
        modifyAmount,
    }));

    res.json({ 
        message: `Cards updated successfully for side deck in deck ${deckId}`, 
        updatedCards: updatedCardsSummary, 
    });
})

// @desc Delete a card from the main deck
// @route Delete /maindeck/:id
// @access Public
const DeleteCardfromMainDeck = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { deckId, cardUpdates } = req.body

    if (!id || !deckId || !cardUpdates) {
        return res.status(400).json({ message: 'User ID, deck ID, and an array of card updates are required' });
    }

    const user = await User.findById(id);
    const deck = await Deck.findOne({ user_id: id, _id: deckId})

    if (!deck) {
        return res.status(404).json({ message: 'Deck not found for user' });
    }

    cardUpdates.forEach(({ card_name }) => {
        if (!card_name) {
            return res.status(400).json({ message: 'Each card update must have a valid card_name' });
        }

        const cardIndex = deck.main_deck_cards.findIndex(card => card.card_name === card_name);

        if (cardIndex === -1) {
            return res.status(400).json({ message: `Card with name ${card_name} not found in main deck` });
        }

        deck.main_deck_cards.splice(cardIndex, 1);
    });

    deck.total_cards_main_deck = deck.main_deck_cards.reduce((total, card) => total + (card.cardInDeckOwnedAmount || 0), 0);

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save();
    await deck.save();

    res.json({ message: 'Selected cards removed successfully', updatedDeck: deck });
})

// @desc Delete a card from the extra deck
// @route Delete /extradeck/:id
// @access Public
const DeleteCardfromExtraDeck = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { deckId, cardUpdates } = req.body

    if (!id || !deckId || !cardUpdates) {
        return res.status(400).json({ message: 'User ID, deckId, and cards are required' });
    }

    const user = await User.findById(id);
    const deck = await Deck.findOne({ user_id: id, _id: deckId})

    cardUpdates.forEach(({ card_name }) => {
        if (!card_name) {
            return res.status(400).json({ message: 'Each card update must have a valid card_name' });
        }

        const cardIndex = deck.extra_deck_cards.findIndex(card => card.card_name === card_name);

        if (cardIndex === -1) {
            return res.status(400).json({ message: `Card with name ${card_name} not found in extra deck` });
        }

        deck.extra_deck_cards.splice(cardIndex, 1);
    });

    deck.total_cards_extra_deck = deck.extra_deck_cards.reduce((total, card) => total + (card.cardInDeckOwnedAmount || 0), 0);

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save();
    await deck.save();

    res.json({ message: 'Selected cards removed successfully', updatedDeck: deck });
})

// @desc Delete a card from the side deck
// @route Delete /sidedeck/:id
// @access Public
const DeleteCardfromSideDeck = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { deckId, cardUpdates } = req.body

    if (!id || !deckId || !cardUpdates) {
        return res.status(400).json({ message: 'User ID, deckId, and cards are required' });
    }

    const user = await User.findById(id);
    const deck = await Deck.findOne({ user_id: id, _id: deckId})

    cardUpdates.forEach(({ card_name }) => {
        if (!card_name) {
            return res.status(400).json({ message: 'Each card update must have a valid card_name' });
        }

        const cardIndex = deck.side_deck_cards.findIndex(card => card.card_name === card_name);

        if (cardIndex === -1) {
            return res.status(400).json({ message: `Card with name ${card_name} not found in side deck` });
        }

        deck.side_deck_cards.splice(cardIndex, 1);
    });

    deck.total_cards_side_deck = deck.side_deck_cards.reduce((total, card) => total + (card.cardInDeckOwnedAmount || 0), 0);

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save();
    await deck.save();

    res.json({ message: 'Selected cards removed successfully', updatedDeck: deck });
})

// @desc Delete a deck
// @route Delete /:id
// @access Public
const DeleteDeck = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { deckId } = req.body

    if (!id || !deckId) {
        return res.status(400).json({ message: "userid and/or deck id are missing "})
    }

    const deck = await Deck.find({ user_id: id, _id: deckId})

    if (!deck) {
        return res.status(405).json({ message: "Deck not found" });
    }
    
    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }

    const deleteResult = await Deck.deleteOne({ user_id: id, _id: deckId});
    if (deleteResult.deletedCount === 0) {
        return res.status(500).json({ message: "Failed to delete deck from database" });
    }

    user.totalOwnedDecks = Math.max((user.totalOwnedDecks || 1) - 1, 0);

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;
    
    await user.save();

    res.status(200).json({ message: `Deck deleted for user ${user.username} successfully` });
})

module.exports = {
    createNewDeck,
    createDuplicateDeck,
    getAllDecksforUser,
    getSpecificDeckforUser,
    makeFavoriteDeck,
    addCardtoMainDeck,
    addCardtoExtraDeck,
    addCardtoSideDeck,
    modifyCardAmountinMainDeck,
    modifyCardAmountinExtraDeck,
    modifyCardAmountinSideDeck,
    DeleteCardfromMainDeck,
    DeleteCardfromExtraDeck,
    DeleteCardfromSideDeck,
    DeleteDeck
}