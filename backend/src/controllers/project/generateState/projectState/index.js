const reduce = require('ramda').reduce
const Result = require('folktale').result

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

// createProjectState :: repository -> User -> Result ProjectState
const createProjectState = (getCleanedProjects, projectRepo, user) =>
  getCleanedProjects(projectRepo, user)
    .then(indexProjects)
    .then(indexToState)
    .then(Result.Ok)
    .catch(() =>
      Result.Error('Something went wrong while fetching the projects... sorry.')
    )

module.exports = {
  indexProjects,
  getIndexLength,
  indexToState,
  createProjectState
}
