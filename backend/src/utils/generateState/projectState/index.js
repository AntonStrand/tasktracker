const reduce = require('ramda').reduce
const getCleanedProjects = require('./../getCleanedProjects')

// indexProjects :: [Project] -> { project.id: Project }
const indexProjects = reduce(
  (index, project) => ({ ...index, [project.id]: project }),
  {}
)

// getIndexLength :: Object -> Number
const getIndexLength = index => Object.keys(index).length

const indexToState = index => ({
  projectsById: index,
  count: getIndexLength(index)
})

// createProjectState :: repository -> User -> {ProjectState}
const createProjectState = (projectRepo, user) =>
  getCleanedProjects(projectRepo, user)
    .then(indexProjects)
    .then(indexToState)
    .catch(() => Error('An error occured while fetching your projects.'))

module.exports = {
  indexProjects,
  getIndexLength,
  indexToState,
  createProjectState
}
