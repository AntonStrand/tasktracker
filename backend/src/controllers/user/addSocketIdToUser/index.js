const jwt = require('jsonwebtoken')
const Maybe = require('folktale/maybe')
const R = require('ramda')

// tokenToId :: JWT-token -> Maybe String
const safeTokenToId = token =>
  Maybe.fromNullable(jwt.decode(token)).map(({ id }) => id)

// addSocketId :: (UserRepo, String) -> Maybe String -> Maybe User
const addSocketId = (userRepo, socketId) => maybeUserId =>
  maybeUserId.map(userRepo.addSocketId(socketId))

// addSocketIdToUser :: UserRepo -> ({id: String}, {token: JWT}) -> Maybe User
module.exports = userRepo => ({ id }, { token }) =>
  R.compose(addSocketId(userRepo, id), safeTokenToId)(token)
