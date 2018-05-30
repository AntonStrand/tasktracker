const jwt = require('jsonwebtoken')
const compose = require('ramda/src/compose')
const Maybe = require('folktale').maybe

// tokenToId :: JWT-token -> null String
const tokenToId = token =>
  Maybe.fromNullable(jwt.decode(token)).fold(() => null, ({ id }) => id)

// maybeFindUser :: Repository -> String -> Maybe String (Username)
const maybeFindUser = repository => id =>
  repository
    .findById(id)
    .then(Maybe.fromNullable)
    .catch(Maybe.Nothing)

// maybeGetAuthenticatedUser :: repository -> jwt-token -> Maybe User
const maybeGetAuthenticatedUser = repository =>
  compose(maybeFindUser(repository), tokenToId)

module.exports = maybeGetAuthenticatedUser
