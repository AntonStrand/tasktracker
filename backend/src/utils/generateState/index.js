const projectRepo = require('./../../repositories/projectRepository')
const taskRepo = require('./../../repositories/taskRepository')

const getUserData = require('./getUserData')(projectRepo, taskRepo)

module.exports = {
  getUserData
}
