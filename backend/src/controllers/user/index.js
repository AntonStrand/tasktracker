module.exports.initConnection = (io, socket, payload) => ({ id }) =>
  require('./joinProjectRoom')(socket, id)
