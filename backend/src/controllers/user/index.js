// initConnection :: _, socket, _ -> User -> undefined
module.exports.initConnection = (io, socket, payload) => ({ id }) =>
  require('./joinProjectRoom')(socket, id)
