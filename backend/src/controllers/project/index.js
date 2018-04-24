const projectRepository = require('./../../repositories/projectRepository')
const userRepository = require('./../../repositories/userRepository')
const taskRepository = require('./../../repositories/taskRepository')

module.exports = {
  create: require('./create').create(projectRepository, userRepository),
  addTask: require('./addTask').addTask(
    projectRepository,
    taskRepository,
    userRepository
  )
}
