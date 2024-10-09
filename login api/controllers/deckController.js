const asyncHandler = require("express-async-handler");
const { User } = require("../models/genmodels");

// @desc Create a new owned Deck
// @route POST /:id
// @access Public
const createNewDeck = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { deck_name = req.body.deckname || '' } = req.body;

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

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    const newDeck = {
        deck_name: deck_name,
        deck_desc: "a new deck maybe its cool maybe its mysterious"
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
// @route GET /specific/:id
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

// @desc Change the Deck description or name of a specific deck
// @route PATCH /specific/:id
// @access Public
/*const changeSpecificDeckDetailsforUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    const [ deck_name ] = req.body 

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

    user.username = username
    user.email = email

})*/

// @desc Add a card to the main deck
// @route PATCH /maindeck/:id
// @access Public
const addCardtoMainDeck = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { deck_name, main_deck_cards } = req.body

    if (!id || !deck_name || !main_deck_cards) {
        return res.status(400).json({ message: "no userid, card-data, and/or deck name provided" })
    }

    const invalidDeckCards = main_deck_cards.filter(deck => !deck.card_name || !deck.image_url || !deck.type || !deck.race || !deck.desc);

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

    const existingCard = selectedDeck.main_deck_cards.find(deck => deck.card_name === main_deck_cards[0].card_name);

    if (existingCard) {
        return res.status(409).json({ message: `Card with the name ${main_deck_cards[0].card_name} already exists in the deck`});
    }

    const cardsToAdd = main_deck_cards.map(card => ({ ...card, ownedamount: 1 }));

    if ((selectedDeck.total_cards_main_deck || 0) + main_deck_cards.length > 60) {
        return res.status(400).json({ message: 'main deck limit of 60 cards will be exceeded if this card is added' });
    }

    selectedDeck.main_deck_cards.push(...cardsToAdd);

    selectedDeck.total_cards_deck = (selectedDeck.total_cards_deck || 0) + main_deck_cards.length;
    selectedDeck.total_cards_main_deck = (selectedDeck.total_cards_main_deck || 0) + main_deck_cards.length;


    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save();

    res.status(200).json({ message: `Card with card name ${main_deck_cards[0].card_name} added to the main deck of deck with name${deck_name} for user called ${user.username}`})
})

// @desc Add a card to the extra deck
// @route PATCH /extradeck/:id
// @access Public
const addCardtoExtraDeck = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { deck_name, extra_deck_cards } = req.body

    if (!id || !deck_name || !extra_deck_cards) {
        return res.status(400).json({ message: "no userid, card-data, and/or deck name provided" })
    }

    const invalidDeckCards = extra_deck_cards.filter(deck => !deck.card_name || !deck.image_url || !deck.type || !deck.race || !deck.desc);

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

    const existingCard = selectedDeck.extra_deck_cards.find(deck => deck.card_name === extra_deck_cards[0].card_name);

    if (existingCard) {
        return res.status(409).json({ message: `Card with the name ${extra_deck_cards[0].card_name} already exists in the deck`});
    }

    const cardsToAdd = extra_deck_cards.map(card => ({ ...card, ownedamount: 1 }));

    if ((selectedDeck.total_cards_extra_deck || 0) + extra_deck_cards.length > 15) {
        return res.status(400).json({ message: 'extra deck limit of 15 cards will be exceeded if this card is added' });
    }

    selectedDeck.extra_deck_cards.push(...cardsToAdd);

    selectedDeck.total_cards_deck = (selectedDeck.total_cards_deck || 0) + extra_deck_cards.length;
    selectedDeck.total_cards_extra_deck = (selectedDeck.total_cards_extra_deck || 0) + extra_deck_cards.length;

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save();

    res.status(200).json({ message: `Card with card name ${extra_deck_cards[0].card_name} added to the main deck of deck with name${deck_name} for user called ${user.username}`})
})

// @desc Add a card to the side deck
// @route PATCH /sidedeck/:id
// @access Public
const addCardtoSideDeck = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { deck_name, side_deck_cards } = req.body

    if (!id || !deck_name || !side_deck_cards) {
        return res.status(400).json({ message: "no userid, card-data, and/or deck name provided" })
    }

    const invalidDeckCards = side_deck_cards.filter(deck => !deck.card_name || !deck.image_url || !deck.type || !deck.race || !deck.desc);

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

    const existingCard = selectedDeck.side_deck_cards.find(deck => deck.card_name === side_deck_cards[0].card_name);

    if (existingCard) {
        return res.status(409).json({ message: `Card with the name ${side_deck_cards[0].card_name} already exists in the deck`});
    }

    const cardsToAdd = side_deck_cards.map(card => ({ ...card, ownedamount: 1 }));

    if ((selectedDeck.total_cards_side_deck || 0) + side_deck_cards.length > 15) {
        return res.status(400).json({ message: 'side deck limit of 15 cards will be exceeded if this card is added' });
    }

    selectedDeck.side_deck_cards.push(...cardsToAdd);

    selectedDeck.total_cards_deck = (selectedDeck.total_cards_deck || 0) + side_deck_cards.length;
    selectedDeck.total_cards_side_deck = (selectedDeck.total_cards_side_deck || 0) + side_deck_cards.length;

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save();

    res.status(200).json({ message: `Card with card name ${side_deck_cards[0].card_name} added to the main deck of deck with name${deck_name} for user called ${user.username}`})
})


// @desc Increase the amount of a specific card in the main deck
// @route PATCH /maindeck/increase/:id
// @access Public
const increaseCardAmountinMainDeck = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { card_name, deck_name, increaseOwnedAmount } = req.body;

    if (!id || !card_name || !deck_name || isNaN(increaseOwnedAmount)) {
        return res.status(400).json({ message: 'User ID, card name, deck name, and valid increaseownedamount are required' });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const selectedDeck = user.ownedDecks.find((deck) => deck.deck_name === deck_name);

    if (!selectedDeck) {
        return res.status(404).json({ message: 'Deck not found for user' });
    }

    const exist = selectedDeck.main_deck_cards.find(card => card.card_name === card_name);

    if (!exist) {
        return res.status(404).json({ message: 'Owned card not found in main deck' });
    }

    const existingOwnedAmount = exist.ownedamount || 0;
    const parsedIncreaseAmount = parseInt(increaseOwnedAmount, 10) || 0; 
    const newtotal = existingOwnedAmount + parsedIncreaseAmount;

    if (newtotal > 60) {
        return res.status(400).json({ message: "Increase would exceed the main deck limit of 60"})
    }


    exist.ownedamount += parseInt(increaseOwnedAmount, 10);

    selectedDeck.total_cards_deck = (selectedDeck.total_cards_deck || 0) + parseInt(increaseOwnedAmount, 10);
    selectedDeck.total_cards_main_deck = (selectedDeck.total_cards_main_deck || 0) + parseInt(increaseOwnedAmount, 10);

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save()

    res.json({ message: `Owned amount of card ${card_name} in deck ${deck_name} increased by ${increaseOwnedAmount} successfully`, ownedDeck: selectedDeck });
})

// @desc Increase the amount of a specific card in the extra deck
// @route PATCH /extradeck/increase/:id
// @access Public
const increaseCardAmountinExtraDeck = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { card_name, deck_name, increaseOwnedAmount } = req.body;

    if (!id || !card_name || !deck_name || isNaN(increaseOwnedAmount)) {
        return res.status(400).json({ message: 'User ID, card name, deck name, and valid increaseownedamount are required' });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const selectedDeck = user.ownedDecks.find((deck) => deck.deck_name === deck_name);

    if (!selectedDeck) {
        return res.status(404).json({ message: 'Deck not found for user' });
    }

    const exist = selectedDeck.extra_deck_cards.find(card => card.card_name === card_name);

    if (!exist) {
        return res.status(404).json({ message: 'Owned card not found in extra deck' });
    }

    const existingOwnedAmount = exist.ownedamount || 0;
    const parsedIncreaseAmount = parseInt(increaseOwnedAmount, 10) || 0; 
    const newtotal = existingOwnedAmount + parsedIncreaseAmount;

    if (newtotal > 15) {
        return res.status(400).json({ message: "Increase would exceed the extra deck limit of 15"})
    }

    exist.ownedamount += parseInt(increaseOwnedAmount, 10);

    selectedDeck.total_cards_deck = (selectedDeck.total_cards_deck || 0) + parseInt(increaseOwnedAmount, 10);
    selectedDeck.total_cards_extra_deck = (selectedDeck.total_cards_extra_deck || 0) + parseInt(increaseOwnedAmount, 10);

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save()

    res.json({ message: `Owned amount of card ${card_name} in deck ${deck_name} increased by ${increaseOwnedAmount} successfully`, ownedDeck: selectedDeck });
})

// @desc Increase the amount of a specific card in the side deck
// @route PATCH /sidedeck/increase/:id
// @access Public
const increaseCardAmountinSideDeck = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { card_name, deck_name, increaseOwnedAmount } = req.body;

    if (!id || !card_name || !deck_name || isNaN(increaseOwnedAmount)) {
        return res.status(400).json({ message: 'User ID, card name, deck name, and valid increaseownedamount are required' });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const selectedDeck = user.ownedDecks.find((deck) => deck.deck_name === deck_name);

    if (!selectedDeck) {
        return res.status(404).json({ message: 'Deck not found for user' });
    }

    const exist = selectedDeck.side_deck_cards.find(card => card.card_name === card_name);

    if (!exist) {
        return res.status(404).json({ message: 'Owned card not found in side deck' });
    }

    const existingOwnedAmount = exist.ownedamount || 0;
    const parsedIncreaseAmount = parseInt(increaseOwnedAmount, 10) || 0; 
    const newtotal = existingOwnedAmount + parsedIncreaseAmount;

    if (newtotal > 15) {
        return res.status(400).json({ message: "Increase would exceed the side deck limit of 15"})
    }

    exist.ownedamount += parseInt(increaseOwnedAmount, 10);

    selectedDeck.total_cards_deck = (selectedDeck.total_cards_deck || 0) + parseInt(increaseOwnedAmount, 10);
    selectedDeck.total_cards_side_deck = (selectedDeck.total_cards_side_deck || 0) + parseInt(increaseOwnedAmount, 10);

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save()

    res.json({ message: `Owned amount of card ${card_name} in deck ${deck_name} increased by ${increaseOwnedAmount} successfully`, ownedDeck: selectedDeck });
})

// @desc decrease the amount of a specific card in the main deck
// @route PATCH /maindeck/decrease/:id
// @access Public
const decreaseCardAmountinMainDeck = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { card_name, deck_name, decreaseOwnedAmount } = req.body;

    if (!id || !card_name || !deck_name || isNaN(decreaseOwnedAmount)) {
        return res.status(400).json({ message: 'User ID, card name, deck name, and valid increaseownedamount are required' });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const selectedDeck = user.ownedDecks.find((deck) => deck.deck_name === deck_name);

    if (!selectedDeck) {
        return res.status(404).json({ message: 'Deck not found for user' });
    }

    const exist = selectedDeck.main_deck_cards.find(card => card.card_name === card_name);

    if (!exist) {
        return res.status(404).json({ message: 'Owned card not found in main deck' });
    }

    const existingOwnedAmount = exist.ownedamount || 0;
    const parsedDecreaseAmount = parseInt(decreaseOwnedAmount, 10) || 0; 

    if (existingOwnedAmount - parsedDecreaseAmount <= 0) {
        return res.status(400).json({ message: "Owned amount cannot be reduced to 0 or below"})
    }

    exist.ownedamount -= parseInt(decreaseOwnedAmount, 10);

    selectedDeck.total_cards_deck = (selectedDeck.total_cards_deck || 0) - parseInt(decreaseOwnedAmount, 10);
    selectedDeck.total_cards_main_deck = (selectedDeck.total_cards_main_deck || 0) - parseInt(decreaseOwnedAmount, 10);

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save()

    res.json({ message: `Owned amount of card ${card_name} in deck ${deck_name} decreased by ${decreaseOwnedAmount} successfully`, ownedDeck: selectedDeck });
})

// @desc decrease the amount of a specific card in the extra deck
// @route PATCH /extradeck/decrease/:id
// @access Public
const decreaseCardAmountinExtraDeck = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { card_name, deck_name, decreaseOwnedAmount } = req.body;

    if (!id || !card_name || !deck_name || isNaN(decreaseOwnedAmount)) {
        return res.status(400).json({ message: 'User ID, card name, deck name, and valid increaseownedamount are required' });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const selectedDeck = user.ownedDecks.find((deck) => deck.deck_name === deck_name);

    if (!selectedDeck) {
        return res.status(404).json({ message: 'Deck not found for user' });
    }

    const exist = selectedDeck.extra_deck_cards.find(card => card.card_name === card_name);

    if (!exist) {
        return res.status(404).json({ message: 'Owned card not found in extra deck' });
    }

    const existingOwnedAmount = exist.ownedamount || 0;
    const parsedDecreaseAmount = parseInt(decreaseOwnedAmount, 10) || 0; 

    if (existingOwnedAmount - parsedDecreaseAmount <= 0) {
        return res.status(400).json({ message: "Owned amount cannot be reduced to 0 or below"})
    }

    exist.ownedamount -= parseInt(decreaseOwnedAmount, 10);

    selectedDeck.total_cards_deck = (selectedDeck.total_cards_deck || 0) - parseInt(decreaseOwnedAmount, 10);
    selectedDeck.total_cards_extra_deck = (selectedDeck.total_cards_extra_deck || 0) - parseInt(decreaseOwnedAmount, 10);

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save()

    res.json({ message: `Owned amount of card ${card_name} in deck ${deck_name} decreased by ${decreaseOwnedAmount} successfully`, ownedDeck: selectedDeck });
})

// @desc decrease the amount of a specific card in the side deck
// @route PATCH /sidedeck/decrease/:id
// @access Public
const decreaseCardAmountinSideDeck = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { card_name, deck_name, decreaseOwnedAmount } = req.body;

    if (!id || !card_name || !deck_name || isNaN(decreaseOwnedAmount)) {
        return res.status(400).json({ message: 'User ID, card name, deck name, and valid increaseownedamount are required' });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const selectedDeck = user.ownedDecks.find((deck) => deck.deck_name === deck_name);

    if (!selectedDeck) {
        return res.status(404).json({ message: 'Deck not found for user' });
    }

    const exist = selectedDeck.side_deck_cards.find(card => card.card_name === card_name);

    if (!exist) {
        return res.status(404).json({ message: 'Owned card not found in side deck' });
    }

    const existingOwnedAmount = exist.ownedamount || 0;
    const parsedDecreaseAmount = parseInt(decreaseOwnedAmount, 10) || 0; 

    if (existingOwnedAmount - parsedDecreaseAmount <= 0) {
        return res.status(400).json({ message: "Owned amount cannot be reduced to 0 or below"})
    }

    exist.ownedamount -= parseInt(decreaseOwnedAmount, 10);

    selectedDeck.total_cards_deck = (selectedDeck.total_cards_deck || 0) - parseInt(decreaseOwnedAmount, 10);
    selectedDeck.total_cards_side_deck = (selectedDeck.total_cards_side_deck || 0) - parseInt(decreaseOwnedAmount, 10);

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save()

    res.json({ message: `Owned amount of card ${card_name} in deck ${deck_name} decreased by ${decreaseOwnedAmount} successfully`, ownedDeck: selectedDeck });
})

// @desc Delete a card from the main deck
// @route Delete /maindeck/:id
// @access Public
const DeleteCardfromMainDeck = asyncHandler(async (req, res) => {
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
        return res.status(404).json({ message: `main deck from deck ${deck_name} not found for this user` });
    }

    const cardIndex = selectedDeck.main_deck_cards.findIndex(deck => deck.card_name === card_name);

    if (cardIndex === -1) {
        return res.status(404).json({ message: 'Owned card not found in main deck' });
    }

    selectedDeck.main_deck_cards.splice(cardIndex, 1);

    selectedDeck.total_cards_deck = (selectedDeck.total_cards_deck || 0) - 1;
    selectedDeck.total_cards_main_deck = (selectedDeck.total_cards_main_deck || 0) - 1;

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save();

    res.status(200).json({ message: `Card ${card_name} deleted from the main deck in deck ${deck_name} for user ${user.username} successfully` });

})

// @desc Delete a card from the extra deck
// @route Delete /extradeck/:id
// @access Public
const DeleteCardfromExtraDeck = asyncHandler(async (req, res) => {
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
        return res.status(404).json({ message: `extra deck from deck ${deck_name} not found for this user` });
    }

    const exist = selectedDeck.extra_deck_cards.findIndex(deck => deck.card_name === card_name);

    if (exist === -1) {
        return res.status(404).json({ message: 'Owned card not found in extra deck' });
    }

    selectedDeck.extra_deck_cards.splice(cardIndex, 1);

    selectedDeck.total_cards_deck = (selectedDeck.total_cards_deck || 0) - 1;
    selectedDeck.total_cards_extra_deck = (selectedDeck.total_cards_extra_deck || 0) - 1;

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save();

    res.status(200).json({ message: `Card ${card_name} deleted from the extra deck in deck ${deck_name} for user ${user.username} successfully` });

})

// @desc Delete a card from the side deck
// @route Delete /sidedeck/:id
// @access Public
const DeleteCardfromSideDeck = asyncHandler(async (req, res) => {
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
        return res.status(404).json({ message: `side deck from deck ${deck_name} not found for this user` });
    }

    const exist = selectedDeck.side_deck_cards.findIndex(deck => deck.card_name === card_name);

    if (exist === -1) {
        return res.status(404).json({ message: 'Owned card not found in the side deck' });
    }

    selectedDeck.side_deck_cards.splice(cardIndex, 1);

    selectedDeck.total_cards_deck = (selectedDeck.total_cards_deck || 0) - 1;
    selectedDeck.total_cards_side_deck = (selectedDeck.total_cards_side_deck || 0) - 1;

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    await user.save();

    res.status(200).json({ message: `Card ${card_name} deleted from the side deck in deck ${deck_name} for user ${user.username} successfully` });

})

// @desc Delete a deck
// @route Delete /:id
// @access Public
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
    
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;
    
    await user.save();

    res.status(200).json({ message: `Deck ${deck_name} deleted for user ${user.username} successfully` });
})

module.exports = {
    createNewDeck,
    getAllDecksforUser,
    getSpecificDeckforUser,
    addCardtoMainDeck,
    addCardtoExtraDeck,
    addCardtoSideDeck,
    increaseCardAmountinMainDeck,
    increaseCardAmountinExtraDeck,
    increaseCardAmountinSideDeck,
    decreaseCardAmountinMainDeck,
    decreaseCardAmountinExtraDeck,
    decreaseCardAmountinSideDeck,
    DeleteCardfromMainDeck,
    DeleteCardfromExtraDeck,
    DeleteCardfromSideDeck,
    DeleteDeck
}