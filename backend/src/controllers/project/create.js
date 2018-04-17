const { maybeGetAuthenticatedUsername } = require('./../authentication/')
const {
  createProjectDoc,
  saveProjectToMembers,
  cleanProjectData
} = require('./utils')

const emitError = (socket, error) => () =>
  socket.emit('action', {
    type: 'form/VALIDATION_ERROR',
    formId: 'project',
    error
  })

const emitNewProject = (socket, project) =>
  socket.emit('action', {
    type: 'project/NEW_PROJECT_CREATED',
    project: cleanProjectData(project)
  })

// create :: repository -> {token, formData} -> [String]
const create = (repository, userRepo) => (socket, { token, formData }) =>
  maybeGetAuthenticatedUsername(token)
    .then(maybeUsername =>
      maybeUsername.fold(
        emitError(socket, 'Access denied.') /* user is not authenticated */,
        createProjectDoc(formData)
      )
    )
    .then(repository.create)
    .then(project => {
      saveProjectToMembers(userRepo)(project)
      emitNewProject(socket, project)
    })
    .catch(emitError(socket, `Sorry, the project couldn't be created.`))

module.exports = {
  create
}

// TODO: Respond with errors in case the input is invalid or has to be changed.
// TODO: Should notify the user which users that has been added in case someone was removed.
// TODO: Should return error messages if deadline has passed.
// TODO: Should return error messages if user can't be authenticated.
