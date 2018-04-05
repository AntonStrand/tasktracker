'use strict'

const router = require('express').Router()
const controller = require('./../controllers/authController')
const repository = require('./../repositories/userRepository')

router.post('/sign-up', controller.signUp(repository))

router.post('/login', controller.login(repository))

module.exports = router
