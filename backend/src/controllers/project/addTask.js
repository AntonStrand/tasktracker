'use strict'

/**
 * Add a task to a project.
 */

const { maybeGetAuthenticatedUsername } = require('./../authentication/')
const { breakChain } = require('./utils')

const { emitAccessDenied } = require('./actions/user')
const { emitFormValidationError } = require('./actions/form')
const { emitNewTask } = require('./actions/project')

const createTaskDoc = ({ parent, taskName: title }) => username => ({
  title,
  parent,
  assignees: [username]
})

const DENIED = 'Access denied.'

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
      maybeUsername.fold(breakChain(DENIED), createTaskDoc(formData))
    )
    .then(taskRepo.create)
    .then(task => {
      addTaskToAssignees(userRepo, task)
      projectRepo.addTaskId(task.parent.id, task._id)
      emitNewTask(socket, task)
    })
    .catch(
      error =>
        error.message === DENIED
          ? emitAccessDenied(socket)
          : emitFormValidationError(
            socket,
            'task',
            `Sorry, the task couldn't be added.`
          )
    )

module.exports = {
  addTask
}
