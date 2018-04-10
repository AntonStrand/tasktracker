const ctrl = require('./../controllers/socketController')
const userRepository = require('./../repositories/userRepository')

module.exports = io =>
  io.on('connection', socket =>
    socket.on('action', payload => {
      switch (payload.type) {
        case 'ws/AUTHENTICATE':
          ctrl.authenticate(userRepository)(payload)
      }
    })
  )
