const {
  emitFormValidationError,
  emitTaskStateChanged
} = require('./../actions/index')
const Maybe = require('folktale').maybe
const { pipe, toLower, trim, map, chain } = require('ramda')
const { TODO, IN_PROGRESS, DONE } = require('./../../../models/Task').taskStates

// safeString :: String -> Maybe String
const safeString = str =>
  typeof str === 'string' ? Maybe.Just(str) : Maybe.Nothing()

// isValidStatus :: String => Maybe String
const isValidStatus = state =>
  [TODO, IN_PROGRESS, DONE].indexOf(state) !== -1
    ? Maybe.Just(state)
    : Maybe.Nothing()

// formatString :: String -> String
const formatString = pipe(trim, toLower)

// validateState :: String -> Maybe String
const validateStatus = pipe(safeString, map(formatString), chain(isValidStatus))

// changeTaskState :: repository -> (io, socket, {status: String, taskId}) -> _ -> undefined
const changeTaskStatus = repository => (io, socket, payload) => () =>
  validateStatus(payload.status)
    .map(repository.changeStatus(payload.taskId))
    .fold(
      emitFormValidationError(socket, 'taskState', 'The state was invalid.'),
      emitTaskStateChanged(io)
    )

module.exports = changeTaskStatus

module.exports.validateStatus = validateStatus
