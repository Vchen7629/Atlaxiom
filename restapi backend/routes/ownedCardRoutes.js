const express = require('express');
const router = express.Router();
const ownedcardController = require('../controllers/ownedcardController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)


router.route('/addcard')
  .post(ownedcardController.createOwnedCard)

router.route('/getcards')
  .get(ownedcardController.getAllOwnedCards)

router.route('/updatecard')
  .patch(ownedcardController.updateOwnedCard)

router.route('/deletecard')
  .delete(ownedcardController.deleteOwnedCardByUsername)

module.exports = router;

