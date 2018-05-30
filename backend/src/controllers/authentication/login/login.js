'use strict'

/**
 * Controller for login
 */

const getUserData = require('./../../project/generateState')
const maybeGetUser = require('./../authenticateByToken')
const curry = require('ramda/src/curry')

// sendToken :: {json :: (a -> a)} -> User -> undefined
const sendUserState = curry(async (res, user) =>
  res.json(await getUserData(user))
)

const onAccessDenied = res => res.json({ error: 'Wrong username or password.' })

// loginUserData :: UserRepo -> (a, a -> Boolean) -> {body :: {username :: String, password :: String}} -> {json :: (a -> a)} -> undefined
const loginByUserData = (userRepository, compare) => (req, res) =>
  userRepository
    .findByUsername(req.body.username)
    .then(
      async user =>
        req.body.password && (await compare(req.body.password, user.password))
          ? sendUserState(res, user)
          : onAccessDenied(res)
    )
    .catch(e => onAccessDenied(res))

// loginByToken :: JWT-token, {json :: (a -> a)} -> undefined
const loginByToken = (token, res) =>
  maybeGetUser(token).then(maybeUser =>
    maybeUser.fold(() => onAccessDenied(res), sendUserState(res))
  )

/**
 * Try to log in user.
 * Either by user data or by JWT-token
 * @param {Object} userRepository
 * @param {Object} req
 * @param {Object} res
 */
const login = (userRepository, compare) => (req, res) =>
  req.body.token
    ? loginByToken(req.body.token, res)
    : loginByUserData(userRepository, compare)(req, res)

module.exports = {
  login,
  sendUserState,
  onAccessDenied
}
