const jwt = require('jsonwebtoken')
const compose = require('ramda').compose
const { isNotNil, alwaysFalse } = require('./../../utils/')
const Maybe = require('folktale/maybe')
const R = require('ramda')

// tokenToId :: JWT-token -> null String
const tokenToId = token =>
  Maybe.fromNullable(jwt.decode(token)).fold(() => null, ({ id }) => id)

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
const maybeGetAuthenticatedUsername = repository => token =>
  compose(maybeFindUsername(repository), tokenToId)(token)

module.exports = {
  maybeGetAuthenticatedUsername,
  isUser
}
