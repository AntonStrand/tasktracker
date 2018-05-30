'use strict'

/**
 * Controller for signing up
 */

const { findSignUpErrorMessages } = require('./errorMessageHelpers')

/**
 * Try to register a user.
 * @param {Object} repository
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const signUp = repository => (req, res, next) =>
  repository
    .save({
      username: req.body.username,
      password: req.body.password
    })
    .then(user =>
      res
        .status(200)
        .json({ message: [`User "${user.username}" has been created.`] })
    )
    .catch(err => res.json({ error: findSignUpErrorMessages(err) }))

module.exports = signUp
