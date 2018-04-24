const { maybeGetAuthenticatedUsername } = require('./../authentication/')
const {
  createProjectDoc,
  saveProjectToMembers,
  breakChain
} = require('./utils')

const { emitAccessDenied } = require('./actions/user')
const { emitFormValidationError } = require('./actions/form')
const { emitNewProject } = require('./actions/project')

const DENIED = 'Access denied.'

// create :: repository -> {token, formData} -> [String]
const create = (repository, userRepo) => (socket, { token, formData }) =>
  maybeGetAuthenticatedUsername(token)
    .then(maybeUsername =>
      maybeUsername.fold(breakChain(DENIED), createProjectDoc(formData))
    )
    .then(repository.create)
    .then(project => {
      saveProjectToMembers(userRepo)(project)
      emitNewProject(socket, project)
    })
    .catch(
      error =>
        error.message === DENIED
          ? emitAccessDenied(socket)
          : emitFormValidationError(
            socket,
            'project',
            `Sorry, the project couldn't be created.`
          )
    )

module.exports = {
  create
}

// TODO: Respond with errors in case the input is invalid or has to be changed.
// TODO: Should notify the user which users that has been added in case someone was removed.
// TODO: Should return error messages if deadline has passed.
