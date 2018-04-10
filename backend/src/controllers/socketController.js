const jwt = require('jsonwebtoken')
const compose = require('ramda').compose
const { isNotNil, alwaysFalse } = require('./../utils/')

// tokenToId :: JWT-token -> String
const tokenToId = token => jwt.decode(token).id

// findUser :: Repository -> String -> Boolean
const isUser = repository => id =>
  repository
    .findById(id)
    .then(isNotNil)
    .catch(alwaysFalse)

// authenticate :: repository -> jwt-token -> Boolean
const isAuthenticated = repository => ({ token }) =>
  compose(isUser(repository), tokenToId)(token)

module.exports = {
  isAuthenticated
}
