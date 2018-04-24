const types = require('./types')
const { cleanProjectData } = require('./../utils')

// cleanTaskData :: Task -> {Task}
const cleanTaskData = td => ({
  title: td.title,
  status: td.status,
  id: td._id,
  description: td.description,
  timer: td.timer,
  priority: td.priority,
  assignees: td.assignees,
  parent: td.parent,
  deadline: td.deadline,
  createdAt: td.createdAt,
  updatedAt: td.updatedAt
})

const emitNewProject = (socket, project) =>
  socket.emit('action', {
    type: types.NEW_PROJECT_CREATED,
    project: cleanProjectData(project)
  })

const emitNewTask = (socket, task) =>
  socket.emit('action', {
    type: types.NEW_TASK_CREATED,
    task: cleanTaskData(task)
  })

module.exports = {
  emitNewProject,
  emitNewTask
}
