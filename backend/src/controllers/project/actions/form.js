const { FORM_VALIDATION_ERROR } = require('./types')

const emitFormValidationError = (socket, formId, error) => () =>
  socket.emit('action', {
    type: FORM_VALIDATION_ERROR,
    formId,
    error
  })

module.exports = {
  emitFormValidationError
}
