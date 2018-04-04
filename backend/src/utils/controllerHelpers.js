'use strict'

/**
 * Helper functions for controllers
 */

const curry = require('ramda').curry

// findErrorMessages :: Predicate f -> ValidationError -> [String]
const findErrorMessages = curry((pred, error) =>
  Object.entries(error.errors).map(
    pair => (pred(pair[0]) ? pair[1].message : 'No error.')
  )
)

// isNotValidationError :: Error -> Boolean
const isNotValidationError = error =>
  error.name !== 'BulkWriteError' && error.name !== 'ValidationError'

// flashMessage :: String -> [String] -> Object
const flashMessage = curry((type, message) => ({ type, message }))

// successMessage :: String -> Object
const successMessage = flashMessage('success')

// errorMessage :: String -> Object
const errorMessage = flashMessage('error')

module.exports = {
  findErrorMessages,
  isNotValidationError,
  successMessage,
  errorMessage
}
