'use strict'

/**
 * Helper functions for generate error messages

 */

const curry = require('ramda').curry
const ifElse = require('ramda').ifElse

// findErrorMessages :: Predicate f -> ValidationError -> [String]
const findErrorMessages = curry((pred, error) =>
  Object.entries(error.errors).map(pair => pred(pair[0]) && pair[1].message)
)

// getErrorMessages :: (a -> Bool) -> Error -> [String]
const getErrorMessages = curry(pred =>
  ifElse(isValidationError, findErrorMessages(pred), () => [])
)

// isValidationError :: Error -> Boolean
const isValidationError = error => error.name === 'ValidationError'

// isErrorKey :: String -> Boolean
const isUserDataError = key => key === 'username' || key === 'password'

// getErrorMessages :: ValidationError -> [String] null
const findSignUpErrorMessages = getErrorMessages(isUserDataError)

module.exports = {
  getErrorMessages,
  findErrorMessages,
  isValidationError,
  findSignUpErrorMessages,
  isUserDataError
}
