const express = require("express")
const router = express.Router()
const deckController = require("../controllers/deckController")
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route("/")
    .post(deckController.createNewDeck)

router.route("/duplicate/:id")
    .post(deckController.createDuplicateDeck)

router.route("/favorite/:id")
    .patch(deckController.makeFavoriteDeck)

router.route("/:id")
    .get(deckController.getAllDecksforUser)
    .delete(deckController.DeleteDeck)

router.route("/maindeck/:id")
    .patch(deckController.addCardtoMainDeck)
    .delete(deckController.DeleteCardfromMainDeck)

router.route("/maindeck/update/:id")
    .patch(deckController.modifyCardAmountinMainDeck)

router.route("/extradeck/:id")
    .patch(deckController.addCardtoExtraDeck)
    .delete(deckController.DeleteCardfromExtraDeck)

router.route("/extradeck/update/:id")
    .patch(deckController.modifyCardAmountinExtraDeck)

router.route("/sidedeck/:id")
    .patch(deckController.addCardtoSideDeck)
    .delete(deckController.DeleteCardfromSideDeck)

router.route("/sidedeck/update/:id")
    .patch(deckController.modifyCardAmountinSideDeck)
    
router.route("/specific/:id/:deckId")
    .get(deckController.getSpecificDeckforUser)

module.exports = router;