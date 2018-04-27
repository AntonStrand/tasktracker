'use strict'

/**
 * Helper functions for controllers
 */

const curry = require('ramda').curry
const ifElse = require('ramda').ifElse

// findErrorMessages :: Predicate f -> ValidationError -> [String]
const findErrorMessages = curry((pred, error) =>
  Object.entries(error.errors).map(
    pair => (pred(pair[0]) ? pair[1].message : 'No error.')
  )
)

// getErrorMessages :: (a -> Bool) -> Error -> [String]
const getErrorMessages = curry(pred =>
  ifElse(isValidationError, findErrorMessages(pred), () => [])
)

// isValidationError :: Error -> Boolean
const isValidationError = error => error.name === 'ValidationError'

// flashMessage :: String -> [String] -> Object
const flashMessage = curry((type, message) => ({ type, message }))

// successMessage :: String -> Object
const successMessage = flashMessage('success')

// errorMessage :: String -> Object
const errorMessage = flashMessage('error')

module.exports = {
  getErrorMessages,
  findErrorMessages,
  isValidationError,
  successMessage,
  errorMessage
}
