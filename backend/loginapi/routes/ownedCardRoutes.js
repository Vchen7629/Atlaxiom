const express = require('express');
const router = express.Router();
const ownedcardController = require('../controllers/ownedcardController');

router.route('/')
  .post(ownedcardController.createOwnedCard)
  .get(ownedcardController.getAllOwnedCards)
  .delete(ownedcardController.deleteOwnedCardByUsername)

router.route('/increasecard/')
  .patch(ownedcardController.IncreaseCard)

router.route('/decreasecard/')
  .patch(ownedcardController.DecreaseCard)


module.exports = router;

