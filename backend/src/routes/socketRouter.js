const project = require('./../controllers/project')
const projectRepository = require('./../repositories/projectRepository')
const userRepository = require('./../repositories/userRepository')

const actions = type =>
  ({
    'ws/CREATE_NEW_PROJECT': project.create(projectRepository, userRepository)
  }[type])

module.exports = io =>
  io.on('connection', socket =>
    socket.on('action', payload => actions(payload.type)(payload))
  )
