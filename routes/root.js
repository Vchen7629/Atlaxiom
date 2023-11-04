const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
}) /*get request method in expressjs that only goes through if the request is a slash or index, html optional. returns a response consisting of the file from index.html file in views file */

module.exports = router