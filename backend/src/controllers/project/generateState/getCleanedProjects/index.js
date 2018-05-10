const cleanData = require('./../cleanData')
const curry = require('ramda/src/curry')
const { alwaysNull, removeNull } = require('./../../../../utils')

// getCleanedProjects :: ProjectRepo -> User -> [Project]
module.exports = curry((projectRepo, user) =>
  Promise.all(
    user.projects.map(id =>
      projectRepo
        .findById(id)
        .then(cleanData)
        .catch(alwaysNull)
    )
  ).then(removeNull)
)
