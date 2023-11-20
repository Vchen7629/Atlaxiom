const { User } = require('../models/genmodels');
const asyncHandler = require('express-async-handler')

// @desc Create a new owned card
// @route POST /ownedcards
// @access Public
const createOwnedCard = asyncHandler(async (req, res) => {

  const { id, ownedCards } = req.body;

  // Check if username and ownedCard are provided
  if (!id || !ownedCards) {
    return res.status(400).json({ message: 'user id and ownedCard are required' });
  }

  // Check if ownedCard has the required fields
  const invalidCards = ownedCards.filter(card => !card.card_name || !card.image_url || card.ownedprop === undefined);

  if (invalidCards.length > 0) {
    return res.status(400).json({ message: 'card_name, image_url, and owned are required for each card in ownedCards' });
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

  // Add the new ownedCard to the user's ownedCards array
  user.ownedCards.push(...ownedCards);

  // Save the user with the new ownedCard
  await user.save();

  res.status(201).json({ message: `New card named ${ownedCards[0].card_name} created for user ${user.username}` });

});


// @desc Get all owned cards for a user
// @route GET /dash/users/ownedcards/:id
// @access Public
const getAllOwnedCards = asyncHandler(async (req, res) => {

  const { id } = req.params;
  
  //Check if the user ID is provided
  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  // Find the user by id
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if the user has owned cards
  if (!user.ownedCards || user.ownedCards.length === 0) {
    return res.status(404).json({ message: 'Owned cards not found for the user' });
  }

  // If the user has owned cards, return them
  res.json({_id: id, ownedCards: user.ownedCards});

});


// @desc Update an owned card
// @route PATCH /dash/users/ownedcards/:id/:CardName
// @access Public
const updateOwnedCard = asyncHandler(async (req, res) => {

  const { id, CardName } = req.params;
  const { image_url, ownedprop } = req.body;

  // Check if CardId is provided in the request params
  if (!CardName) {
    return res.status(400).json({ message: 'Card Name is required' });
  }

  // Find the user by username
  const user = await User.findById(id);
    
  //check to see if user exists in db
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Find the owned card by its properties within the user's ownedCards array
  const ownedCard = user.ownedCards.find(card => card.card_name === CardName)

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

});

// @desc Delete an owned card for a user by card name
// @route DELETE /ownedcards/:Userid/:cardName
// @access Public
const deleteOwnedCardByUsername = asyncHandler(async (req, res) => {

  const { id, cardName } = req.params;

  // Check if username and cardName are provided
  if (!id || !cardName) {
    return res.status(400).json({ message: 'Username and card name are required' });
  }

  // Find the user by username
  const user = await User.findById(id);

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

  res.status(201).json({ message: `Owned card ${user.ownedCards[0].card_name} for user ${user.username} deleted successfully` });

});



module.exports = {
  createOwnedCard,
  getAllOwnedCards,
  updateOwnedCard,
  deleteOwnedCardByUsername,
}



