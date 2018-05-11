const types = require('./types')
const cleanData = require('./../generateState/cleanData')

const emitNewProject = io => project =>
  io.sockets.in(project._id).emit('action', {
    type: types.NEW_PROJECT_CREATED,
    project: cleanData(project)
  })

const emitNewTask = (io, task) =>
  io.sockets.in(task.parent.id).emit('action', {
    type: types.NEW_TASK_CREATED,
    task: cleanData(task)
  })

const emitTaskStateChanged = io => taskPromise =>
  Promise.resolve(taskPromise).then(task =>
    io.sockets.in(task.parent.id).emit('action', {
      type: types.TASK_STATE_CHANGED,
      task: cleanData(task)
    })
  )

module.exports = {
  emitNewProject,
  emitNewTask,
  emitTaskStateChanged
}
