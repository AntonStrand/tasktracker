const userRepo = require('./../../../repositories/userRepository')
const compare = require('bcrypt').compare

module.exports = require('./login').login(userRepo, compare)
