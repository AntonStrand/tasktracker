const jwt = require('jsonwebtoken')
const generateToken = require('./generateToken')(jwt)
const { createProjectState } = require('./projectState')
const { createTaskState } = require('./taskState')

// getUserData :: projectRepo, taskRepo -> User -> Promise Object
const getUserData = (projectRepo, taskRepo) => async user => ({
  user: {
    token: generateToken(user),
    username: user.username,
    assignedTasks: user.assignedTasks
  },
  projects: await createProjectState(projectRepo, user),
  tasks: await createTaskState(projectRepo, taskRepo, user)
})

module.exports = getUserData