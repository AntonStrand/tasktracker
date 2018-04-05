'use strict'

/**
 * Controller for signing up
 */

const { getErrorMessages } = require('./../../utils/controllerHelpers')

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
    .save({
      username: req.body.username,
      password: req.body.password
    })
    .then(user =>
      res.status(200).send([`User '${user.username}' has been created.`])
    )
    .catch(err => res.status(422).send(getMessages(err)))

module.exports = signUp
