'use strict'

/**
 * Controller for login
 */

const bcrypt = require('bcrypt')
const getUserData = require('./../project/generateState')

// sendToken :: Object -> User -> undefined
const sendUserState = async (res, user) => res.json(await getUserData(user))

const onAccessDenied = res => res.json({ error: 'Wrong username or password.' })

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
          ? sendUserState(res, user)
          : onAccessDenied(res)
    )
    .catch(e => onAccessDenied(res))

module.exports = {
  login,
  sendUserState,
  onAccessDenied
}
