const express = require('express');
const router = express.Router();
const ownedcardController = require('../controllers/ownedcardController');


router.route('/')
  .post(ownedcardController.createOwnedCard)

router.route('/:id')
  .get(ownedcardController.getAllOwnedCards)

router.route('/:id/:CardName')
  .patch(ownedcardController.updateOwnedCard)

router.route('/:id/:cardName')
  .delete(ownedcardController.deleteOwnedCardByUsername)

module.exports = router;

