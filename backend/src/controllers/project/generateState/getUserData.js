const jwt = require('jsonwebtoken')
const generateToken = require('./generateToken')(jwt)
const { createProjectState } = require('./projectState')
const { createTaskState } = require('./taskState')
const getCleanedProjects = require('./getCleanedProjects')

// getOrElse :: a -> Result a -> a
const getOrElse = defaultValue => result => result.getOrElse(defaultValue)

// getUserData :: projectRepo, taskRepo -> User -> Promise Object
const getUserData = (projectRepo, taskRepo) => async user => ({
  user: {
    token: generateToken(user),
    username: user.username,
    assignedTasks: user.assignedTasks
  },
  projects: await createProjectState(
    getCleanedProjects,
    projectRepo,
    user
  ).then(
    getOrElse({
      projectsById: {},
      count: 0
    })
  ),
  tasks: await createTaskState(projectRepo, taskRepo, user).then(x => x)
})

module.exports = getUserData
