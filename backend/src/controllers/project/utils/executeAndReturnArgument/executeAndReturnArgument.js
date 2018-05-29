const curry = require('ramda/src/curry')

// executeAndReturnArgument :: (a -> b) -> a -> a
const executeAndReturnArgument = curry((fn, x) => {
  fn(x)
  return x
})

module.exports = executeAndReturnArgument
