const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController.js')
const LoginLimiter = require('../../../frontend/middleware/loginlimiter.js')

router.route('/')
    .post(LoginLimiter, authController.login)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

module.exports = router