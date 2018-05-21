const project = require('./../controllers/project')
const user = require('./../controllers/user')
const { switchCase } = require('./../utils')

// actions :: String -> (io, socket, a) -> *
const actions = switchCase({
  'ws/USER_AUTHENTICATED': user.initConnection,
  'ws/CREATE_NEW_PROJECT': project.create,
  'ws/CREATE_NEW_TASK': project.addTask,
  'ws/CHANGE_TASK_STATUS': project.changeStatus,
  'ws/CHANGE_TASK_PRIORITY': project.changeTaskPriority
})(() => {})

module.exports = io =>
  io.on('connection', socket => {
    socket.on('action', payload => actions(payload.type)(io, socket, payload))
  })

// For testing
module.exports.actions = actions
