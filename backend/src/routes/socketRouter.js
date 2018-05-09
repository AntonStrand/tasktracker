const project = require('./../controllers/project')
const user = require('./../controllers/user')

// TODO: Handle a non-listed event
const actions = type =>
  ({
    'ws/CREATE_NEW_PROJECT': project.create,
    'ws/CREATE_NEW_TASK': project.addTask,
    'ws/USER_AUTHENTICATED': user.addSocketIdToUser
  }[type])

module.exports = io =>
  io.on('connection', socket => {
    // TODO: Save socket.id to user to be able to add users to the project.
    console.log('socket.id:', socket.id)
    socket.on('action', payload => actions(payload.type)(socket, payload))
  })
