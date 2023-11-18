const { User } = require('../models/genmodels');

// @desc Create a new owned card
// @route POST /ownedcards
// @access Public
const createOwnedCard = async (req, res) => {
  try {
    const { username, ownedCards } = req.body;

    // Check if username and ownedCard are provided
    if (!username || !ownedCards) {
      return res.status(400).json({ message: 'username and ownedCard are required' });
    }

    // Check if ownedCard has the required fields
    const invalidCards = ownedCards.filter(card => !card.card_name || !card.image_url || card.ownedprop === undefined);

    if (invalidCards.length > 0) {
      return res.status(400).json({ message: 'card_name, image_url, and owned are required for each card in ownedCards' });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Initialize ownedCards array if it doesn't exist
    user.ownedCards = user.ownedCards || [];

    const duplicateUser = user.ownedCards.find(card => card.card_name === ownedCards[0].card_name);

    if (duplicateUser) {
      return res.status(409).json({ message: 'Duplicate card for the user' });
    }

    // Add the new ownedCard to the user's ownedCards array
    user.ownedCards.push(...ownedCards);

    // Save the user with the new ownedCard
    await user.save();

    res.status(201).json({ message: `New card named ${ownedCards[0].card_name} created for user ${username}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


// @desc Get all owned cards for a user
// @route GET /ownedcards/:username
// @access Public
const getAllOwnedCards = async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has owned cards
    if (!user.ownedCards || user.ownedCards.length === 0) {
      return res.status(404).json({ message: 'Owned cards not found for the user' });
    }

    // If the user has owned cards, return them
    res.json(user.ownedCards);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


// @desc Update an owned card
// @route PATCH /ownedcards/:username
// @access Public
const updateOwnedCard = async (req, res) => {
  try {
    const { username } = req.params;
    const { card_name, image_url, ownedprop } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    
    //check to see if user exists in db
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the owned card by its properties within the user's ownedCards array
    const ownedCard = user.ownedCards.find(card => card.card_name === card_name)

    //check to see if the owned card exists for that user
    if (!ownedCard) {
      return res.status(404).json({ message: 'Owned card not found' });
    }

    // Update the owned card properties
    ownedCard.image_url = image_url;
    ownedCard.ownedprop = ownedprop;

    // Save the updated user
    await user.save();

    res.json(ownedCard);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// @desc Delete an owned card for a user by card name
// @route DELETE /ownedcards/:username/:cardName
// @access Public
const deleteOwnedCardByUsername = async (req, res) => {
  try {
    const { username, cardName } = req.params;

    // Check if username and cardName are provided
    if (!username || !cardName) {
      return res.status(400).json({ message: 'Username and card name are required' });
    }

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists in the database
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the index of the owned card in the user's ownedCards array by card name
    const cardIndex = user.ownedCards.findIndex(card => card.card_name === cardName);

    // Check if the owned card exists for that user
    if (cardIndex === -1) {
      return res.status(404).json({ message: 'Owned card not found' });
    }

    // Remove the owned card from the user's ownedCards array
    user.ownedCards.splice(cardIndex, 1);

    // Save the updated user
    await user.save();

    res.json({ message: 'Owned card deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};



module.exports = {
  createOwnedCard,
  getAllOwnedCards,
  updateOwnedCard,
  deleteOwnedCardByUsername,
}



