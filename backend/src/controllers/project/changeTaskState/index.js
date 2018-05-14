const {
  emitAccessDenied,
  emitFormValidationError,
  emitTaskStateChanged
} = require('./../actions/index')
const Maybe = require('folktale/Maybe')
const { pipe, toLower, trim, map, chain } = require('ramda')
const { TODO, IN_PROGRESS, DONE } = require('./../../../models/Task').taskStates
const isAuthenticated = require('./../../authentication')
  .maybeGetAuthenticatedUsername

// safeString :: String -> Maybe String
const safeString = str =>
  typeof str === 'string' ? Maybe.Just(str) : Maybe.Nothing()

// isValidState :: String => Maybe String
const isValidState = state =>
  [TODO, IN_PROGRESS, DONE].indexOf(state) !== -1
    ? Maybe.Just(state)
    : Maybe.Nothing()

// formatString :: String -> String
const formatString = pipe(trim, toLower)

// validateState :: String -> Maybe String
const validateState = pipe(safeString, map(formatString), chain(isValidState))

// changeTaskState :: repository -> (io, socket, {token: JWT, state: String, taskId}) -> undefined
const changeTaskState = repository => (io, socket, payload) =>
  isAuthenticated(payload.token).then(maybeUser =>
    maybeUser.fold(emitAccessDenied(socket), () =>
      validateState(payload.state)
        .map(repository.changeState(payload.taskId))
        .fold(
          emitFormValidationError(
            socket,
            'taskState',
            'The state was invalid.'
          ),
          emitTaskStateChanged(io)
        )
    )
  )

module.exports = changeTaskState

module.exports.validateState = validateState
