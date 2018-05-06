const projectRepo = require('./../../../repositories/projectRepository')
const taskRepo = require('./../../../repositories/taskRepository')

module.exports = require('./getUserData')(projectRepo, taskRepo)
