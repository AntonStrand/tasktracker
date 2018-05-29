const reduce = require('ramda/src/reduce')

// arrayToIndex :: [{ id:String, ...a }] -> { id:{a} }
const arrayToIndex = reduce((index, x) => ({ ...index, [x.id]: x }), {})

module.exports = arrayToIndex
