'use strict'

/**
 * Controller for login
 */

const bcrypt = require('bcrypt')

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

module.exports = login
