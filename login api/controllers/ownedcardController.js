const { User, OwnedCard } = require('../models/genmodels');
const asyncHandler = require('express-async-handler')

// @desc Create a new owned card
// @route POST /:id
// @access Public
const createOwnedCard = asyncHandler(async (req, res) => {
  
  const { id } = req.params
  const { card_name, image_url, set_code, type, race, desc, ...optionalFields } = req.body;

  if (!id || !card_name || !image_url || !type || !race || !desc || !set_code) {
    return res.status(400).json({ message: 'User ID and all card fields are required' });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const userCards = await OwnedCard.find({ user_id: id });

  const duplicateCard = userCards.some(card => card.card_name === card_name && card.set_code === set_code);

  if (duplicateCard) {
    return res.status(409).json({ message: `Card with name "${card_name}" already exists for this user` });
  }

  const now = new Date();
  const formattedDate = now.toISOString().split('T')[0];
  const formattedTime = now.toTimeString().split(' ')[0];

  const newCard = new OwnedCard({
    user_id: id,
    card_name,
    image_url,
    ownedamount: 1,
    type,
    race,
    desc,
    set_code,
    addedOn: formattedDate,
    ...optionalFields
  });
  
  try {
    await newCard.save();
    user.totalOwnedCards = (user.totalOwnedCards || 0) + 1;
    user.lastAdded = card_name;
    user.lastCardUpdated = `${formattedDate} ${formattedTime}`;
    user.uniqueCards = user.uniqueCards + 1;
    await user.save();

    res.status(201).json({
      message: `New card "${card_name}" added successfully for user ${user.username}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create owned card' });
  }

});


// @desc Get all owned cards for a user
// @route GET /:id
// @access Public
const getAllOwnedCards = asyncHandler(async (req, res) => {

  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ message: 'user id is required' });
  }

  const allCards = await OwnedCard.find({ user_id: id })

  // If the user has owned cards, return them
  res.json({ id, ownedCards: allCards});

});


// @desc Update by increasing the amount of an owned card
// @route PATCH /increasecard/:id
// @access Public
const IncreaseCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { card_name, increaseOwnedAmount } = req.body;

  if (!id || !card_name || isNaN(increaseOwnedAmount)) {
    return res.status(400).json({ message: 'User ID and card name and valid increaseownedamount are required' });
  }

  const user = await User.findById(id);
  const card = await OwnedCard.findOne({ user_id: id, card_name})

  if (!card) {
    return res.status(404).json({ message: 'Card not found' });
  }

  const now = new Date();
  const formattedDate = now.toISOString().split('T')[0];
  const formattedTime = now.toTimeString().split(' ')[0];

  card.ownedamount = Number(card.ownedamount) + Number(increaseOwnedAmount) || 1;

  user.totalOwnedCards = Number(user.totalOwnedCards) + Number(increaseOwnedAmount) || 1;
  user.lastCardUpdated = `${formattedDate} ${formattedTime}`;

  await user.save();
  await card.save();

  res.json( `Successfully increased owned amount for ${card_name} ` );
});

// @desc Update by decreasing the amount of an owned card
// @route PATCH /decreasecard/:id
// @access Public
const DecreaseCard = asyncHandler(async (req, res) => {
  
  const { id } = req.params
  const { card_name, decreaseOwnedAmount } = req.body;

  if (!id || !card_name || isNaN(decreaseOwnedAmount)) {
    return res.status(400).json({ message: 'User ID, card name, and valid decreaseownedamount are required' });
  }

  const user = await User.findById(id);
  const card = await OwnedCard.findOne({ user_id: id, card_name})

  if (!card) {
    return res.status(404).json({ message: 'Card not found' });
  }

  const now = new Date();
  const formattedDate = now.toISOString().split('T')[0];
  const formattedTime = now.toTimeString().split(' ')[0];

  card.ownedamount =  Math.max(Number(card.ownedamount) - Number(decreaseOwnedAmount), 1);

  if (card.ownedamount < 1) {
    return res.status(405).json({ message: "Unable to decrease card to 0, try deleting the card instead"})
  }

  user.totalOwnedCards = Number(user.totalOwnedCards) - Number(decreaseOwnedAmount) || 1;
  user.lastCardUpdated = `${formattedDate} ${formattedTime}`;

  await user.save();
  await card.save();

  res.json(`Successfully decreased owned amount for ${card_name} `);
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
  const card = await OwnedCard.findOne({ user_id: id, card_name})

  if (!card) {
    return res.status(404).json({ message: 'Card not found' });
  }

  const now = new Date();
  const formattedDate = now.toISOString().split('T')[0];
  const formattedTime = now.toTimeString().split(' ')[0];

  const cardToDelete = card;
  const cardAmount = cardToDelete.ownedamount;

  await OwnedCard.deleteOne({ _id: card._id });

  user.totalOwnedCards = (Number(user.totalOwnedCards) || 0) - cardAmount;
  user.lastDeleted = card_name;
  user.lastCardUpdated = `${formattedDate} ${formattedTime}`;

  if (user.uniqueCards != -1) {
    user.uniqueCards = user.uniqueCards - 1;
  }
  
  await user.save();

 
  res.status(200).json({
    message: `Card "${card_name}" deleted successfully for user ${user.username}`
  });

});



module.exports = {
  createOwnedCard,
  getAllOwnedCards,
  IncreaseCard,
  DecreaseCard,
  deleteOwnedCardByUsername,
}



