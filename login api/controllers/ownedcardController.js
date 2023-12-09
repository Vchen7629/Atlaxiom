const { User } = require('../models/genmodels');
const asyncHandler = require('express-async-handler')

// @desc Create a new owned card
// @route POST /:id
// @access Public
const createOwnedCard = asyncHandler(async (req, res) => {
  
  const { id } = req.params
  const { ownedCards } = req.body;

  if (!id || !ownedCards) {
    return res.status(400).json({ message: 'user id and ownedCard are required' });
  }

  const invalidCards = ownedCards.filter(card => !card.card_name || !card.image_url || card.ownedprop === undefined || !card.type || !card.race || !card.desc);

  if (invalidCards.length > 0) {
    return res.status(400).json({ message: 'Missing either card_name, image_url, ownedprop, type, race, or desc params in input' });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Initialize ownedCards array if it doesn't exist
  user.ownedCards = user.ownedCards || [];

  const duplicateCard = user.ownedCards.find(card => card.card_name === ownedCards[0].card_name);

  if (duplicateCard) {
    return res.status(409).json({ message: 'Duplicate card for the user' });
  }

  user.totalOwnedCards = Number(user.totalOwnedCards) + ownedCards.length || 1;

  user.ownedCards.push(...ownedCards);

  await user.save();

  res.status(201).json({ message: `New card named ${ownedCards[0].card_name} created for user ${user.username}` });

});


// @desc Get all owned cards for a user
// @route GET /:id
// @access Public
const getAllOwnedCards = asyncHandler(async (req, res) => {

  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ message: 'user id is required' });
  }

  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!user.ownedCards || user.ownedCards.length === 0) {
    return res.status(404).json({ message: 'Owned cards not found for the user' });
  }

  // If the user has owned cards, return them
  res.json({ id, username: user.username, ownedCards: user.ownedCards});

});


// @desc Update by increasing the amount of an owned card
// @route PATCH /increasecard/:id
// @access Public
const IncreaseCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { card_name, increaseOwnedAmount } = req.body;

  // Check if user ID and card details are provided
  if (!id || !card_name || isNaN(increaseOwnedAmount)) {
    return res.status(400).json({ message: 'User ID and card name and valid increaseownedamount are required' });
  }

  // Find the user by ID
  const user = await User.findById(id);

  // Check if the user exists in the database
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Find the owned card by its properties within the user's ownedCards array
  const ownedCard = user.ownedCards.find((card) => card.card_name === card_name);

  // Check if the owned card exists for that user
  if (!ownedCard) {
    return res.status(404).json({ message: 'Owned card not found' });
  }

  ownedCard.ownedamount = Number(ownedCard.ownedamount) + Number(increaseOwnedAmount) || 1;

  user.totalOwnedCards = Number(user.totalOwnedCards) + Number(increaseOwnedAmount) || 1;

  await user.save();

  res.json({ ownedCard });
});

// @desc Update by decreasing the amount of an owned card
// @route PATCH /decreasecard/:id
// @access Public
const DecreaseCard = asyncHandler(async (req, res) => {
  
  const { id } = req.params
  const { card_name, decreaseOwnedAmount } = req.body;

  // Check if user ID and card details are provided
  if (!id || !card_name || isNaN(decreaseOwnedAmount)) {
    return res.status(400).json({ message: 'User ID, card name, and valid decreaseownedamount are required' });
  }

  // Find the user by ID
  const user = await User.findById(id);

  // Check if the user exists in the database
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Find the owned card by its properties within the user's ownedCards array
  const ownedCard = user.ownedCards.find((card) => card.card_name === card_name);

  // Check if the owned card exists for that user
  if (!ownedCard) {
    return res.status(404).json({ message: 'Owned card not found' });
  }

  ownedCard.ownedamount =  Math.max(Number(ownedCard.ownedamount) - Number(decreaseOwnedAmount), 1);

  user.totalOwnedCards = user.ownedCards.reduce((sum, card) => sum + card.ownedamount, 0);
  // Save the updated user
  await user.save();

  res.json({ ownedCard });
});


// @desc Delete an owned card for a user by card name
// @route DELETE /:id
// @access Public
const deleteOwnedCardByUsername = asyncHandler(async (req, res) => {

  const { id } = req.params
  const { card_name } = req.body;
  
  if (!id || !card_name) {
    return res.status(400).json({ message: 'User ID and card name are required' });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const cardIndex = user.ownedCards.findIndex(card => card.card_name === card_name);

  if (cardIndex === -1) {
    return res.status(404).json({ message: 'Owned card not found' });
  }

  user.ownedCards.splice(cardIndex, 1);
  
  await user.save();

 
  if (user.ownedCards.length > 0) {
    res.status(200).json({ message: `Owned card ${card_name} for user ${user.username} deleted successfully` });
  } else {
    res.status(200).json({ message: `Last owned card ${card_name} for user ${user.username} deleted successfully` });
  }

});



module.exports = {
  createOwnedCard,
  getAllOwnedCards,
  IncreaseCard,
  DecreaseCard,
  deleteOwnedCardByUsername,
}



