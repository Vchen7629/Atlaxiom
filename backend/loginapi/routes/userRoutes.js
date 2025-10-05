const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const authMiddleware = require('../middleware/auth_middleware')

router.route('/')
    .patch(authMiddleware, usersController.updateUser)
    .delete(authMiddleware, usersController.deleteUser)
    .get(authMiddleware, usersController.getSpecificUser)

router.route('/newuser')
    .post(usersController.createNewUser)

module.exports = router