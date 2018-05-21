const {
  emitAccessDenied,
  emitFormValidationError,
  emitTaskOrderUpdated
} = require('./../actions/index')

const isAuthenticated = require('./../../authentication')
  .maybeGetAuthenticatedUser

const groupTasksByParent = require('./../generateState/taskState')
  .groupTasksByParent

const cleanData = require('./../generateState/cleanData')

const changeTaskPriority = repository => (io, socket, { token, tasks }) =>
  isAuthenticated(token).then(maybeUser =>
    maybeUser.fold(emitAccessDenied(socket), () =>
      Promise.all(
        tasks.map((task, prio) =>
          repository.changePriority(task.id, prio).then(cleanData)
        )
      )
        .then(groupTasksByParent)
        .then(emitTaskOrderUpdated(io))
        .catch(
          emitFormValidationError(
            socket,
            'taskPriority',
            "The priority couldn't be saved"
          )
        )
    )
  )

module.exports = changeTaskPriority
