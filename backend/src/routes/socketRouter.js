const project = require('./../controllers/projectController')
const projectRepository = require('./../repositories/projectRepository')

const actions = type =>
  ({
    'ws/CREATE_NEW_PROJECT': project.create(projectRepository)
  }[type])

module.exports = io =>
  io.on('connection', socket =>
    socket.on('action', payload => actions(payload.type)(payload))
  )
