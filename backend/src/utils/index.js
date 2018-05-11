const R = require('ramda')

// isNotNil :: a -> Boolean
const isNotNil = R.complement(R.isNil)

// isNilOrEmpty :: a -> Boolean
const isNilOrEmpty = R.either(R.isEmpty, R.isNil)

// isNotNilNorEmpty :: a -> Boolean
const isNotNilNorEmpty = R.complement(isNilOrEmpty)

// filterAsync :: pred (a -> Boolean) -> [a] -> (Promise [a])
const filterAsync = R.curry((pred, xs) =>
  xs.reduceRight(
    async (filtered, x) =>
      (await pred(x)) ? filtered.then(R.concat([x])) : filtered,
    Promise.resolve([])
  )
)

// alwaysFalse :: _ -> Boolean False
const alwaysFalse = () => false

// alwaysNull :: _ -> null
const alwaysNull = () => null

// removeNull :: [a] -> [a]
const removeNull = xs => xs.filter(x => x !== null)

// switchCase :: {a} -> a -> String -> a
const switchCase = cases => defaultCase => key =>
  cases.hasOwnProperty(key) ? cases[key] : defaultCase

module.exports = {
  isNotNil,
  filterAsync,
  isNilOrEmpty,
  isNotNilNorEmpty,
  alwaysFalse,
  alwaysNull,
  removeNull,
  switchCase
}
