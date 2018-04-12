const project = require('./../controllers/projectController')
const projectRepository = require('./../repositories/projectRepository')

module.exports = io =>
  io.on('connection', socket =>
    socket.on('action', payload => {
      switch (payload.type) {
        case 'ws/CREATE_NEW_PROJECT':
          project.create(projectRepository)(payload)
          break
      }
    })
  )
