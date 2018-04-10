'use strict'

/**
 * Controller for login
 */

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// sendToken :: Object -> User -> undefined
const sendToken = (res, user) =>
  res.json({
    token: jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    )
  })

const onAccessDenied = res => res.status(401).send('Access denied.')

/**
 * Try to log in user.
 * @param {Object} repository
 * @param {Object} req
 * @param {Object} res
 */
const login = (repository, compare = bcrypt.compare) => (req, res) =>
  repository
    .findByUsername(req.body.username)
    .then(
      async user =>
        req.body.password && (await compare(req.body.password, user.password))
          ? sendToken(res, user)
          : onAccessDenied(res)
    )
    .catch(e => onAccessDenied(res))

module.exports = {
  login,
  sendToken,
  onAccessDenied
}
