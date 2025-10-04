const express = require('express')
const router = express.Router()
const googleOauthController = require("../controllers/googleOauthcontroller")

router.route('/auth/login/success')
    .post(googleOauthController.OauthLogin)


module.exports = router