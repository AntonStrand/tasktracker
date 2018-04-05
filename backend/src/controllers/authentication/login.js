'use strict'

/**
 * Controller for login
 */

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// handleLoginSuccess :: Object -> Object -> User -> Undefined
const handleLoginSuccess = (res, user) =>
  res.json({
    token: jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    )
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
      ? handleLoginSuccess(res, user)
      : console.log('was not found')
  } catch (error) {
    console.log(error)
  }
}

module.exports = login
