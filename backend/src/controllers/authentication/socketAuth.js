const jwt = require('jsonwebtoken')
const compose = require('ramda').compose
const { isNotNil, alwaysFalse } = require('./../../utils/')
const Maybe = require('folktale/maybe')
const R = require('ramda')

// tokenToId :: JWT-token -> null String
const tokenToId = token =>
  Maybe.fromNullable(jwt.decode(token))
    .map(({ id }) => id)
    .getOrElse(null)

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
const maybeFindUsername = repository => id =>
  repository
    .findById(id)
    .then(getUsername)
    .catch(Maybe.Nothing)

// authenticate :: repository -> jwt-token -> Boolean
const maybeGetAuthenticatedUsername = repository =>
  compose(maybeFindUsername(repository), tokenToId)

module.exports = {
  maybeGetAuthenticatedUsername,
  isUser
}
