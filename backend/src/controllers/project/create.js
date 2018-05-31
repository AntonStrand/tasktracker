const {
  createProjectDoc,
  saveProjectToMembers,
  executeAndReturnArgument: returnProject
} = require('./utils')
const composeP = require('ramda/src/composeP')
const { emitFormValidationError, emitNewProject } = require('./actions')

// joinRoom :: socket -> [String] -> undefined
const joinProject = socket => ({ _id }) => socket.join(_id)

// createAndEmitNewProject :: projectRepo, socket -> Promise projectDoc
const createAndEmitNewProject = (repository, io, socket) =>
  composeP(
    emitNewProject(io),
    returnProject(joinProject(socket)),
    returnProject(saveProjectToMembers),
    repository.create
  )

// create :: repository -> io, socket, {formData} -> User -> undefined
const create = repository => (io, socket, { formData }) => ({ username }) =>
  createProjectDoc(formData)(username)
    .then(createAndEmitNewProject(repository, io, socket))
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
