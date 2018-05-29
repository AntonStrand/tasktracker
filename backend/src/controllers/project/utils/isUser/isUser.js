const { isNotNil, alwaysFalse } = require('./../../../../utils/')

// isUser :: userRepository -> String -> Boolean
const isUser = repository => username =>
  repository
    .findByUsername(username)
    .then(isNotNil)
    .catch(alwaysFalse)

module.exports = isUser
