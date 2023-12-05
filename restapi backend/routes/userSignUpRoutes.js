const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/newuser')
    .post(usersController.createNewUser)

module.exports = router