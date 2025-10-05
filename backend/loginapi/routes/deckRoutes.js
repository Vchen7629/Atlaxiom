const express = require("express")
const router = express.Router()
const deckController = require("../controllers/deckController")

router.route("/")
    .post(deckController.createNewDeck)
    .get(deckController.getAllDecksforUser)
    .delete(deckController.DeleteDeck)

router.route("/duplicate")
    .post(deckController.createDuplicateDeck)

router.route("/favorite")
    .patch(deckController.makeFavoriteDeck)

router.route("/maindeck")
    .patch(deckController.addCardtoMainDeck)
    .delete(deckController.DeleteCardfromMainDeck)

router.route("/maindeck/update")
    .patch(deckController.modifyCardAmountinMainDeck)

router.route("/extradeck")
    .patch(deckController.addCardtoExtraDeck)
    .delete(deckController.DeleteCardfromExtraDeck)

router.route("/extradeck/update")
    .patch(deckController.modifyCardAmountinExtraDeck)

router.route("/sidedeck")
    .patch(deckController.addCardtoSideDeck)
    .delete(deckController.DeleteCardfromSideDeck)

router.route("/sidedeck/update")
    .patch(deckController.modifyCardAmountinSideDeck)
    
router.route("/specific/:deckId")
    .get(deckController.getSpecificDeckforUser)

module.exports = router;