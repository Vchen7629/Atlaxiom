const express = require('express');
const router = express.Router();
const ownedcardController = require('../controllers/ownedcardController');

router.route('/')
  .post(ownedcardController.createOwnedCard)
  .get(ownedcardController.getAllOwnedCards)
  .patch(ownedcardController.updateOwnedCard)
  .delete(ownedcardController.deleteOwnedCardByUsername)

module.exports = router;

