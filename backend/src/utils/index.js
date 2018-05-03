const R = require('ramda')

// isNotNil :: a -> Boolean
const isNotNil = R.complement(R.isNil)

// alwaysFalse :: a -> Boolean False
const alwaysFalse = R.always(false)

// isNilOrEmpty :: a -> Boolean
const isNilOrEmpty = R.either(R.isEmpty, R.isNil)

// isNotNilNorEmpty :: a -> Boolean
const isNotNilNorEmpty = R.complement(isNilOrEmpty)

// filterAsync :: pred (a -> Boolean) -> [a] -> (Promise [a])
// const filterAsync = R.curry(async (pred, xs) => {
//   const filtered = []
//   for (const x in xs) {
//     if (await pred(x)) filtered.push(x)
//   }
//   return filtered
// })

// filterAsync :: pred (a -> Boolean) -> [a] -> (Promise [a])
const filterAsync = R.curry((pred, xs) =>
  xs.reduce(
    async (filtered, x) =>
      (await pred(x)) ? filtered.then(R.concat([x])) : filtered,
    Promise.resolve([])
  )
)

module.exports = {
  isNotNil,
  alwaysFalse,
  filterAsync,
  isNilOrEmpty,
  isNotNilNorEmpty
}
