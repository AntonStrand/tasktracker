const reduce = require('ramda').reduce
const cleanData = require('./cleanData')

// indexProjects :: [Project] -> { project.id: Project }
const indexProjects = reduce(
  (index, project) => ({ ...index, [project['id']]: project }),
  {}
)

// getIndexLength :: Object -> Number
const getIndexLength = index => Object.keys(index).length

const getCleanedProjects = (projectRepo, user) =>
  Promise.all(
    user.projects.map(id =>
      projectRepo
        .findById(id)
        .then(cleanData)
        .catch(() => 'An error occured while fetching this project.')
    )
  )

// createProjectState :: repository -> User -> {ProjectState}
const createProjectState = (projectRepo, user) =>
  getCleanedProjects(projectRepo, user)
    .then(indexProjects)
    .then(index => ({
      projectsById: index,
      count: getIndexLength(index)
    }))
    .catch(() => 'An error occured while fetching your projects.')

module.exports = {
  createProjectState
}
