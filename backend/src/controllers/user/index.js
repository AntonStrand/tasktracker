const userRepo = require('./../../repositories/userRepository')
const addSocketIdToUser = require('./addSocketIdToUser')

module.exports = {
  addSocketIdToUser: addSocketIdToUser(userRepo)
}
