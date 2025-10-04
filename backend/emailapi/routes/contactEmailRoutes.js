const express = require('express')
const router = express.Router()
const contactEmailController = require("../controllers/contactformController.js") 
const LoginLimiter = require('../middleware/loginlimiter.js')

router.route('/')
    .post(LoginLimiter, contactEmailController.SendContactEmail)

module.exports = router