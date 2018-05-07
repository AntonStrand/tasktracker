const { ACCESS_DENIED } = require('./types')

const emitAccessDenied = socket => () =>
  socket.emit('action', {
    type: ACCESS_DENIED,
    message: 'Access denied.'
  })

module.exports = {
  emitAccessDenied
}
