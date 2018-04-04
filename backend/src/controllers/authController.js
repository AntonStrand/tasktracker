'use strict'

const User = require('./../models/User')
const { findErrorMessages } = require('./../utils/controllerHelpers')

// getErrorMessages :: ValidationError -> [String] null
const getErrorMessages = findErrorMessages(
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
      console.log(err)
      res.status(422)
      res.send(getErrorMessages(err))
    })

module.exports = {
  signUp
}
