const types = require('./types')
const cleanData = require('./../generateState/cleanData')

const emitNewProject = socket => project =>
  socket.emit('action', {
    type: types.NEW_PROJECT_CREATED,
    project: cleanData(project)
  })

const emitNewTask = (socket, task) =>
  socket.emit('action', {
    type: types.NEW_TASK_CREATED,
    task: cleanData(task)
  })

module.exports = {
  emitNewProject,
  emitNewTask
}
