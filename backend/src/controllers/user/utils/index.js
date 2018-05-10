const jwt = require('jsonwebtoken')
const Maybe = require('folktale/maybe')
const R = require('ramda')

// safeTokenToId :: JWT-token -> Maybe String
const safeTokenToId = R.compose(
  R.map(({ id }) => id),
  Maybe.fromNullable,
  jwt.decode
)

module.exports = {
  safeTokenToId
}
