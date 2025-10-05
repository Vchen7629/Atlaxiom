const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController.js')
const LoginLimiter = require('../middleware/loginlimiter.js')
const authMiddleware = require('../middleware/auth_middleware.js')

router.route('/')
    .post(LoginLimiter, authController.login)

router.route('/refresh')
    .get(authMiddleware, authController.refresh)

router.route('/logout')
    .post(authMiddleware, authController.logout)

module.exports = router