'use strict'

/**
 * Add a task to a project.
 */

const { maybeGetAuthenticatedUsername } = require('./../authentication/')

const createTaskDoc = ({ parent, taskName: title }) => username => ({
  title,
  parent,
  assingees: [username]
})

const DENIED_MESSAGE = 'Access denied.'

const breakChain = reason => () => Promise.reject(new Error(reason))

// addTask :: repository -> {token, formData} -> [String]
const addTask = (projectRepo, taskRepo) => (socket, { token, formData }) =>
  maybeGetAuthenticatedUsername(token)
    .then(maybeUsername =>
      maybeUsername.fold(breakChain(DENIED_MESSAGE), createTaskDoc(formData))
    )
    .then(taskRepo.create)
    .then(
      task =>
        console.log(task) || projectRepo.addTaskId(task.parent.id, task._id)
    )
    .then(_ => console.log('Task has been saved.'))
    .catch(console.log)

module.exports = {
  addTask
}
