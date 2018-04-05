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
const login = repository => async (req, res) => {
  repository
    .findUserByName(req.body.username)
    .then(
      async user =>
        (await bcrypt.compare(req.body.password, user.password))
          ? sendToken(res, user)
          : onAccessDenied(res)
    )
    .catch(e => onAccessDenied(res))
}

module.exports = login
