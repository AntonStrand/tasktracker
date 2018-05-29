const {
  createProjectDoc,
  saveProjectToMembers,
  executeAndReturnArgument: returnProject
} = require('./utils')
const composeP = require('ramda/src/composeP')
const { emitFormValidationError, emitNewProject } = require('./actions')

// joinRoom :: socket, userRepo -> [String] -> undefined
const joinProject = socket => ({ _id }) => socket.join(_id)

// createAndEmitNewProject :: projectRepo, userRepo, socket -> Promise projectDoc
const createAndEmitNewProject = (repository, userRepo, io, socket) =>
  composeP(
    emitNewProject(io),
    returnProject(joinProject(socket)),
    returnProject(saveProjectToMembers(userRepo)),
    repository.create
  )

// create :: repository -> {token, formData} -> [String]
const create = (repository, userRepo) => (io, socket, { formData }) => user =>
  createProjectDoc(formData)(user.username)
    .then(createAndEmitNewProject(repository, userRepo, io, socket))
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
