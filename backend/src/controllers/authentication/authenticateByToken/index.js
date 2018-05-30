const userRepo = require('./../../../repositories/userRepository')

module.exports = require('./authenticateByToken')(userRepo)
