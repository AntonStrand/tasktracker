'use strict'

const router = require('express').Router()
const { login, signUp } = require('./../controllers/authentication')

router.post('/sign-up', signUp)

router.post('/login', login)

module.exports = router
