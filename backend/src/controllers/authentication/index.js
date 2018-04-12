const { getAuthenticatedUser, isUser } = require('./socketAuth')
const { login } = require('./login')
const { signUp } = require('./signUp')

const userRepository = require('./../../repositories/userRepository')

module.exports = {
  getAuthenticatedUser: getAuthenticatedUser(userRepository),
  isUser: isUser(userRepository),
  login: login(userRepository),
  signUp: signUp(userRepository)
}
