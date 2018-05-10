const userRepo = require('./../../repositories/userRepository')
const projectRepo = require('./../../repositories/projectRepository')
const addSocketIdToUser = require('./addSocketIdToUser')(userRepo)
const joinProjectRoom = require('./joinProjectRoom')(userRepo, projectRepo)

module.exports.initConnection = (io, socket, payload) => {
  addSocketIdToUser(socket, payload.user.token)
  joinProjectRoom(socket, payload.user.token)
}
