'use strict'

const User = require('./../models/User')

const signUp = repository => (req, res, next) =>
  repository
    .save(
      new User({
        username: req.body.username,
        password: req.body.password
      })
    )
    .then(user => res.status(200))
    .catch(err => {
      res.status(422)
      res.send(err.message)
    })

module.exports = {
  signUp
}
