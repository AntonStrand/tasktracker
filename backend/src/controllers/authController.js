'use strict'

const User = require('./../models/User')
const { getErrorMessages } = require('./../utils/controllerHelpers')

// getErrorMessages :: ValidationError -> [String] null
const getMessages = getErrorMessages(
  key => key === 'username' || key === 'password'
)

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

module.exports = {
  signUp
}
