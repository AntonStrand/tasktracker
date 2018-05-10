const R = require('ramda')
const { maybeGetAuthenticatedUsername } = require('./../authentication/')
const {
  createProjectDoc,
  saveProjectToMembers,
  executeAndReturnArgument: returnProject
} = require('./utils')

// joinRoom :: socket, userRepo -> [String] -> undefined
const joinProject = socket => ({ _id }) => socket.join(_id)

const {
  emitAccessDenied,
  emitFormValidationError,
  emitNewProject
} = require('./actions')

// createAndEmitNewProject :: projectRepo, userRepo, socket -> Promise projectDoc
const createAndEmitNewProject = (repository, userRepo, io, socket) =>
  R.composeP(
    emitNewProject(io),
    returnProject(joinProject(socket)),
    returnProject(saveProjectToMembers(userRepo)),
    repository.create
  )

// create :: repository -> {token, formData} -> [String]
const create = (repository, userRepo) => (io, socket, { token, formData }) =>
  maybeGetAuthenticatedUsername(token)
    .then(maybeUsername =>
      maybeUsername
        .map(createProjectDoc(formData))
        .fold(
          emitAccessDenied(socket),
          createAndEmitNewProject(repository, userRepo, io, socket)
        )
    )
    .catch(
      emitFormValidationError(
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
