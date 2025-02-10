const express = require('express')
const router = express.Router()
const passwordResetController = require("../controllers/passwordresetController") 
const LoginLimiter = require('../middleware/loginlimiter.js')

router.route('/validate-token')
    .patch(passwordResetController.VerifyResetToken)

router.route('/token')
    .post(LoginLimiter, passwordResetController.PasswordToken)

router.route('/reset')
    .post(LoginLimiter, passwordResetController.ResetPassword)

module.exports = router