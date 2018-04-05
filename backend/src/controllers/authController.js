'use strict'

const bcrypt = require('bcrypt')
const User = require('./../models/User')
const { getErrorMessages } = require('./../utils/controllerHelpers')

// getErrorMessages :: ValidationError -> [String] null
const getMessages = getErrorMessages(
  key => key === 'username' || key === 'password'
)

/**
 * Try to register a user.
 * @param {Object} repository
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const signUp = repository => (req, res, next) =>
  repository
    .save(
      new User({
        username: req.body.username,
        password: req.body.password
      })
    )
    .then(user => {
      res.status(200)
      res.send([`User '${user.username}' has been created.`])
    })
    .catch(err => {
      res.status(422)
      res.send(getMessages(err))
    })

// handleLoginSuccess :: Object -> Object -> User -> Undefined
const handleLoginSuccess = (req, res, user) => {
  console.log('login')
  req.session.user = sessionUser(user)
  res.status(200).send('You just logged in.')
}

// sessionUser :: User -> Object
const sessionUser = user => ({
  id: user._id,
  username: user.username
})

/**
 * Try to log in user.
 * @param {Object} repository
 * @param {Object} req
 * @param {Object} res
 */
const login = repository => async (req, res) => {
  try {
    const user = await repository.findUserByName(req.body.username)
    ;(await bcrypt.compare(req.body.password, user.password))
      ? handleLoginSuccess(req, res, user)
      : console.log('was not found')
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  signUp,
  login
}
