const R = require('ramda')

// isNotNil :: a -> Boolean
const isNotNil = R.complement(R.isNil)

// alwaysFalse :: a -> Boolean False
const alwaysFalse = R.always(false)

// isNilOrEmpty :: a -> Boolean
const isNilOrEmpty = R.either(R.isEmpty, R.isNil)

// isNotNilNorEmpty :: a -> Boolean
const isNotNilNorEmpty = R.complement(isNilOrEmpty)

// filterAsync :: pred (a -> Boolean) -> [a] -> [a]
const filterAsync = R.curry(async (pred, xs) => {
  const filtered = []
  for (let i = 0; i < xs.length; i++) {
    if (await pred(xs[i])) filtered.push(xs[i])
  }
  return filtered
})

module.exports = {
  isNotNil,
  alwaysFalse,
  filterAsync,
  isNilOrEmpty,
  isNotNilNorEmpty
}
