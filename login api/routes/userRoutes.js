const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
/*const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)*/

router.route('/')
    .get(usersController.getAllUsers)

router.route('/:id')
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)
    .get(usersController.getspecificuser)


module.exports = router