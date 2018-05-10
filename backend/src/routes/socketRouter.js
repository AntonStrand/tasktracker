const project = require('./../controllers/project')
const user = require('./../controllers/user')

// TODO: Handle a non-listed event
const actions = type =>
  ({
    'ws/CREATE_NEW_PROJECT': project.create,
    'ws/CREATE_NEW_TASK': project.addTask,
    'ws/USER_AUTHENTICATED': user.initConnection
  }[type])

module.exports = io =>
  io.on('connection', socket => {
    socket.on('action', payload => actions(payload.type)(io, socket, payload))
  })
