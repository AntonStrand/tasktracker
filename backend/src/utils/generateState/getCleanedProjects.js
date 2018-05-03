const { cleanData } = require('./index')

module.exports = (projectRepo, user) =>
  Promise.all(
    user.projects.map(id =>
      projectRepo
        .findById(id)
        .then(cleanData)
        .catch(() => 'An error occured while fetching this project.')
    )
  )
