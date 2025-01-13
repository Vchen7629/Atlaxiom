const express = require("express")
const router = express.Router()
const deckController = require("../controllers/deckController")
/*const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)*/

router.route("/")
    .post(deckController.createNewDeck)


router.route("/:id")
    .get(deckController.getAllDecksforUser)
    .delete(deckController.DeleteDeck)

router.route("/maindeck/:id")
    .patch(deckController.addCardtoMainDeck)
    .delete(deckController.DeleteCardfromMainDeck)

router.route("/maindeck/update/:id")
    .patch(deckController.modifyCardAmountinMainDeck)

router.route("/maindeck/decrease/:id")
    .patch(deckController.decreaseCardAmountinMainDeck)

router.route("/extradeck/:id")
    .patch(deckController.addCardtoExtraDeck)
    .delete(deckController.DeleteCardfromExtraDeck)

router.route("/extradeck/increase/:id")
    .patch(deckController.increaseCardAmountinExtraDeck)

router.route("/extradeck/decrease/:id")
    .patch(deckController.decreaseCardAmountinExtraDeck)

router.route("/sidedeck/:id")
    .patch(deckController.addCardtoSideDeck)
    .delete(deckController.DeleteCardfromSideDeck)

router.route("/sidedeck/increase/:id")
    .patch(deckController.increaseCardAmountinSideDeck)

router.route("/sidedeck/decrease/:id")
    .patch(deckController.decreaseCardAmountinSideDeck)
    
router.route("/specific/:id/:deckId")
    .get(deckController.getSpecificDeckforUser)

module.exports = router;