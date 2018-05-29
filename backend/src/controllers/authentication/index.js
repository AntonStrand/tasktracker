const { maybeGetAuthenticatedUser } = require('./socketAuth')
const { login } = require('./login')
const { signUp } = require('./signUp')

const userRepository = require('./../../repositories/userRepository')

module.exports = {
  maybeGetAuthenticatedUser: maybeGetAuthenticatedUser(userRepository),
  login: login(userRepository),
  signUp: signUp(userRepository)
}
