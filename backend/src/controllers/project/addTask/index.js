'use strict'

/**
 * Add a task to a project.
 */

const { emitFormValidationError, emitNewTask } = require('./../actions')

const createTaskDoc = ({ parent, taskName: title }, username) => ({
  title,
  parent,
  assignees: [username]
})

// addTaskToAssignees :: (UserRepo, {assignees::[String], _id::String}) -> [Promise User]
const addTaskToAssignees = (repository, { assignees, _id }) =>
  assignees.map(username => repository.addAssignedTask(username, _id))

// addTask :: (repository, repository, repository) -> (socket, {token, formData}) -> [String]
const addTask = (projectRepo, taskRepo, userRepo) => (
  io,
  socket,
  { formData }
) => ({ username }) =>
  taskRepo
    .create(createTaskDoc(formData, username))
    .then(task => {
      addTaskToAssignees(userRepo, task)
      projectRepo.addTaskId(task.parent.id, task._id)
      emitNewTask(io, task)
    })
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
