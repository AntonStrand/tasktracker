const projectRepository = require('./../../repositories/projectRepository')
const userRepository = require('./../../repositories/userRepository')
const taskRepository = require('./../../repositories/taskRepository')

module.exports = {
  create: require('./create').create(projectRepository),
  addTask: require('./addTask').addTask(
    projectRepository,
    taskRepository,
    userRepository
  ),
  changeStatus: require('./changeTaskStatus')(taskRepository),
  changeTaskPriority: require('./changeTaskPriority')(taskRepository)
}
