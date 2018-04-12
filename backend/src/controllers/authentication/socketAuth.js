const jwt = require('jsonwebtoken')
const compose = require('ramda').compose
const { isNotNil, alwaysFalse } = require('./../../utils/')
const Maybe = require('folktale/maybe')
const R = require('ramda')
// tokenToId :: JWT-token -> String
const tokenToId = token => jwt.decode(token).id

const getUsername = compose(
  R.map(R.view(R.lensProp('username'))),
  Maybe.fromNullable
)

const isUser = repository => username =>
  repository
    .findByUsername(username)
    .then(isNotNil)
    .catch(alwaysFalse)

// findUser :: Repository -> String -> Maybe String (Username)
const findUser = repository => id =>
  repository
    .findById(id)
    .then(getUsername)
    .catch(Maybe.Nothing)

// authenticate :: repository -> jwt-token -> Boolean
const getAuthenticatedUser = repository => token =>
  compose(findUser(repository), tokenToId)(token)

module.exports = {
  getAuthenticatedUser,
  isUser
}
