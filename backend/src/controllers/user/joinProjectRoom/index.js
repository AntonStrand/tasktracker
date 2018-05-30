const userRepo = require('./../../../repositories/userRepository')
const projectRepo = require('./../../../repositories/projectRepository')
const getCleanedProjects = require('./../../project/generateState/getCleanedProjects')

module.exports = require('./joinProjectRoom')(
  userRepo,
  projectRepo,
  getCleanedProjects
)
