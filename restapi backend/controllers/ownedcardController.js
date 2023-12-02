const { User } = require('../models/genmodels');
const asyncHandler = require('express-async-handler')

// @desc Create a new owned card
// @route POST /addcard
// @access Public
const createOwnedCard = asyncHandler(async (req, res) => {

  const { id, ownedCards } = req.body;

  // Check if username and ownedCard are provided
  if (!id || !ownedCards) {
    return res.status(400).json({ message: 'user id and ownedCard are required' });
  }

  // Check if ownedCard has the required fields
  const invalidCards = ownedCards.filter(card => !card.card_name || !card.image_url || card.ownedprop === undefined || !card.type || !card.race || !card.desc);

  if (invalidCards.length > 0) {
    return res.status(400).json({ message: 'Missing either card_name, image_url, ownedprop, type, race, or desc params in input' });
  }

  // Check if the user exists in the database
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Initialize ownedCards array if it doesn't exist
  user.ownedCards = user.ownedCards || [];

  const duplicateUser = user.ownedCards.find(card => card.card_name === ownedCards[0].card_name);

  if (duplicateUser) {
    return res.status(409).json({ message: 'Duplicate card for the user' });
  }

  // Increment the ownedamount for each new card added
  ownedCards.forEach(newCard => {
    newCard.ownedamount = 1;
  });

  // Add the new ownedCard to the user's ownedCards array
  user.ownedCards.push(...ownedCards);

  // Save the user with the new ownedCard
  await user.save();

  res.status(201).json({ message: `New card named ${ownedCards[0].card_name} created for user ${user.username}` });

});


// @desc Get all owned cards for a user
// @route GET /getcards
// @access Public
const getAllOwnedCards = asyncHandler(async (req, res) => {

  const { username } = req.body;
  
  //Check if the user ID is provided
  if (!username) {
    return res.status(400).json({ message: 'username is required' });
  }

  // Find the user by id
  const user = await User.findOne({ username: username });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if the user has owned cards
  if (!user.ownedCards || user.ownedCards.length === 0) {
    return res.status(404).json({ message: 'Owned cards not found for the user' });
  }

  // If the user has owned cards, return them
  res.json({ username: username, ownedCards: user.ownedCards});

});


// @desc Update an owned card
// @route PATCH /updatecard
// @access Public
const updateOwnedCard = asyncHandler(async (req, res) => {

  const { username, card_name, ownedprop, ownedamount } = req.body;

  // Check if username and cardname are provided
  if (!username || !card_name) {
    return res.status(400).json({ message: 'Card Name and username is required' });
  }

  // Find the user by username
  const user = await User.findOne({ username: username });
    
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
  ownedCard.ownedprop = ownedprop;
  ownedCard.ownedamount = ownedamount;

  // Save the updated user
  await user.save();

  res.json(ownedCard);

});

// @desc Delete an owned card for a user by card name
// @route DELETE /deletecard
// @access Public
const deleteOwnedCardByUsername = asyncHandler(async (req, res) => {

  const { username, card_name } = req.body;
  // Check if username and cardName are provided
  if (!username || !card_name) {
    return res.status(400).json({ message: 'Username and card name are required' });
  }

  // Find the user by username
  const user = await User.findOne({ username: username });

  // Check if the user exists in the database
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Find the index of the owned card in the user's ownedCards array by card name
  const cardIndex = user.ownedCards.findIndex(card => card.card_name === card_name);

  // Check if the owned card exists for that user
  if (cardIndex === -1) {
    return res.status(404).json({ message: 'Owned card not found' });
  }

  // Remove the owned card from the user's ownedCards array
  user.ownedCards.splice(cardIndex, 1);

  // Save the updated user
  await user.save();

  // Check if there are remaining owned cards before accessing properties
  if (user.ownedCards.length > 0) {
    res.status(200).json({ message: `Owned card ${card_name} for user ${user.username} deleted successfully` });
  } else {
    res.status(200).json({ message: `Last owned card ${card_name} for user ${user.username} deleted successfully` });
  }

});



module.exports = {
  createOwnedCard,
  getAllOwnedCards,
  updateOwnedCard,
  deleteOwnedCardByUsername,
}



