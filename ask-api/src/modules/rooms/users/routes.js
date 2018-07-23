const express = require('express')
const router = express.Router()

const usersController = require('./controller')

router.get('/users', usersController.getAllUsers)

module.exports = router