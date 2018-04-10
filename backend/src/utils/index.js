const R = require('ramda')

// isNotNil :: a -> Boolean
const isNotNil = R.complement(R.isNil)

// alwaysFalse :: a -> Boolean False
const alwaysFalse = R.always(false)

module.exports = {
  isNotNil,
  alwaysFalse
}
