const jwt = require('jsonwebtoken')
const Maybe = require('folktale/maybe')
const R = require('ramda')

// safeTokenToId :: JWT-token -> Maybe String
const safeTokenToId = R.compose(
  R.map(({ id }) => id),
  Maybe.fromNullable,
  jwt.decode
)

// addSocketId :: (UserRepo, String) -> Maybe String -> Maybe User
const addSocketId = (userRepo, socketId) =>
  R.map(userRepo.addSocketId(socketId))

// addSocketIdToUser :: UserRepo -> ({id: String}, {token: JWT}) -> Maybe User
module.exports = userRepo => ({ id }, { token }) =>
  R.compose(addSocketId(userRepo, id), safeTokenToId)(token)
