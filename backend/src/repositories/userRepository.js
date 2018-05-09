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
const findByUsername = username => User.findOne({ username }).exec()

/**
 * Find a user by id in the database.
 * @param {String} id of the user
 * @return {Promise<User>} Promise of a user model
 */
const findById = _id => User.findOne({ _id }).exec()

/**
 * Add a project to the user in the database.
 * @param {String} username of the user
 * @param {String} projectId
 * @return {Promise<Query>} Promise of a Query
 */
const addProject = (username, projectId) =>
  User.update({ username }, { $push: { projects: projectId } }).exec()

/**
 * Add a project to the user in the database.
 * @param {String} username of the user
 * @param {String} taskId
 * @return {Promise<Query>} Promise of a Query
 */
const addAssignedTask = (username, taskId) =>
  User.update({ username }, { $push: { assignedTasks: taskId } }).exec()

/**
 * Find a user by username and add socketId.
 * @param {String} _id of the user
 * @param {String} socketId of the user
 * @return {Promise<User>} Promise of a user model
 */
const addSocketId = socketId => _id => User.update({ _id }, { socketId }).exec()

module.exports = {
  save,
  findByUsername,
  findById,
  addProject,
  addAssignedTask,
  addSocketId
}
