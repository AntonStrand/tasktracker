const jwt = require('jsonwebtoken')
const compose = require('ramda/src/compose')
const composeP = require('ramda/src/composeP')
const { isNotNil, alwaysFalse } = require('./../../utils/')
const Maybe = require('folktale').maybe
const R = require('ramda')

// tokenToId :: JWT-token -> null String
const tokenToId = token =>
  Maybe.fromNullable(jwt.decode(token)).fold(() => null, ({ id }) => id)

// getUsername :: Maybe User -> Maybe String
const getUsername = R.map(R.view(R.lensProp('username')))

const isUser = repository => username =>
  repository
    .findByUsername(username)
    .then(isNotNil)
    .catch(alwaysFalse)

// maybeFindUser :: Repository -> String -> Maybe String (Username)
const maybeFindUser = repository => id =>
  repository
    .findById(id)
    .then(Maybe.fromNullable)
    .catch(Maybe.Nothing)

// maybeGetAuthenticatedUsername :: repository -> jwt-token -> Maybe String
const maybeGetAuthenticatedUsername = repository =>
  composeP(getUsername, maybeGetAuthenticatedUser(repository))

// maybeGetAuthenticatedUser :: repository -> jwt-token -> Maybe User
const maybeGetAuthenticatedUser = repository =>
  compose(maybeFindUser(repository), tokenToId)

module.exports = {
  maybeGetAuthenticatedUsername,
  maybeGetAuthenticatedUser,
  isUser
}
