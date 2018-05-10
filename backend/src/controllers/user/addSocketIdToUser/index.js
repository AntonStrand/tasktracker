const map = require('ramda').map
const compose = require('ramda').compose
const safeTokenToId = require('./../utils').safeTokenToId

// addSocketId :: (UserRepo, String) -> Maybe String -> Maybe User
const addSocketId = (userRepo, socketId) => map(userRepo.addSocketId(socketId))

// addSocketIdToUser :: UserRepo -> ({id: String}, {token: JWT}) -> Maybe User
module.exports = userRepo => ({ id }, token) =>
  compose(addSocketId(userRepo, id), safeTokenToId)(token)
