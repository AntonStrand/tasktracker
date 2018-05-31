const {
  emitFormValidationError,
  emitTaskOrderUpdated
} = require('./../actions/index')

const groupTasksByParent = require('./../generateState/taskState')
  .groupTasksByParent

const cleanData = require('./../generateState/cleanData')

// changeTaskPriority :: taskRepository -> io, socket, {tasks} -> User -> undefined
const changeTaskPriority = repository => (io, socket, { tasks }) => () =>
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

module.exports = changeTaskPriority
