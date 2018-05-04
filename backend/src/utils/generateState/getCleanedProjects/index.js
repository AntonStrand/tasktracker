const cleanData = require('./../cleanData')
const { alwaysNull, removeNull } = require('./../../index')

// getCleanedProjects :: ProjectRepo -> User -> [Project]
module.exports = (projectRepo, user) =>
  Promise.all(
    user.projects.map(id =>
      projectRepo
        .findById(id)
        .then(cleanData)
        .catch(alwaysNull)
    )
  ).then(removeNull)
