'use strict'

/**
 * Add a task to a project.
 */

const { maybeGetAuthenticatedUsername } = require('./../../authentication/')

const {
  emitAccessDenied,
  emitFormValidationError,
  emitNewTask
} = require('./../actions')

const createTaskDoc = ({ parent, taskName: title }) => username => ({
  title,
  parent,
  assignees: [username]
})

// addTaskToAssignees :: (UserRepo, {assignees::[String], _id::String}) -> [Promise User]
const addTaskToAssignees = (repository, { assignees, _id }) =>
  assignees.map(username => repository.addAssignedTask(username, _id))

// addTask :: (repository, repository, repository) -> (socket, {token, formData}) -> [String]
const addTask = (projectRepo, taskRepo, userRepo) => (
  socket,
  { token, formData }
) =>
  maybeGetAuthenticatedUsername(token)
    .then(maybeUsername =>
      maybeUsername.map(createTaskDoc(formData)).matchWith({
        Nothing: () => emitAccessDenied(socket),
        Just: ({ value: taskDoc }) =>
          taskRepo.create(taskDoc).then(task => {
            addTaskToAssignees(userRepo, task)
            projectRepo.addTaskId(task.parent.id, task._id)
            emitNewTask(socket, task)
          })
      })
    )
    .catch(
      emitFormValidationError(
        socket,
        'task',
        `Sorry, the task couldn't be added.`
      )
    )

module.exports = {
  createTaskDoc,
  addTaskToAssignees,
  addTask
}
