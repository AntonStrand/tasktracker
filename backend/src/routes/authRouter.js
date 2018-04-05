'use strict'

const router = require('express').Router()
const signUp = require('./../controllers/authentication/signUp')
const { login } = require('./../controllers/authentication/login')
const repository = require('./../repositories/userRepository')

router.post('/sign-up', signUp(repository))

router.post('/login', login(repository))

module.exports = router
