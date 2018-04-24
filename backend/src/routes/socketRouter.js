const project = require('./../controllers/project')

// TODO: Handle a non-listed event
const actions = type =>
  ({
    'ws/CREATE_NEW_PROJECT': project.create,
    'ws/CREATE_NEW_TASK': project.addTask
  }[type])

module.exports = io =>
  io.on('connection', socket => {
    // TODO: Save socket.id to user to be able to add users to the project.
    console.log('socket.id:', socket.id)
    socket.on('action', payload => actions(payload.type)(socket, payload))
  })
