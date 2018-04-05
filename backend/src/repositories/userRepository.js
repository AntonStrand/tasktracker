'use strict'

const User = require('./../models/User')

/**
 * Save user to the database.
 * @param {User} doc The user doc that should be saved as a User.
 * @return {Promise<User>} Promise of a user model
 */
const save = doc => new User(doc).save()

/**
 * Find a user by username in the database.
 * @param {String} username of the user
 * @return {Promise<User>} Promise of a user model
 */
const findUserByName = username => User.findOne({ username }).exec()

module.exports = {
  save,
  findUserByName
}
