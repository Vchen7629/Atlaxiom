const express = require("express")
const router = express.Router()
const deckController = require("../controllers/deckController")


router.route("/:id")
    .post(deckController.createNewDeck)
    .get(deckController.getAllDecksforUser)
    .patch(deckController.addCardtoDeck)
    .delete(deckController.DeleteDeck)

router.route("/specific/:id")
    .get(deckController.getSpecificDeckforUser)
    .delete(deckController.DeleteCardfromDeck)

module.exports = router;