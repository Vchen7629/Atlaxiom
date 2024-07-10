const express = require('express');
const router = express.Router();
const ownedcardController = require('../controllers/ownedcardController');
/*const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)*/

router.route('/:id')
  .post(ownedcardController.createOwnedCard)
  .get(ownedcardController.getAllOwnedCards)
  .delete(ownedcardController.deleteOwnedCardByUsername)

router.route('/increasecard/:id')
  .patch(ownedcardController.IncreaseCard)

router.route('/decreasecard/:id')
  .patch(ownedcardController.DecreaseCard)


module.exports = router;

