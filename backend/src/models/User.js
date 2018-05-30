'use strict'

/**
 * User model
 * @param {Object} doc
 * @param {String} doc.username - Required
 * @param {String} doc.password - Required
 * @param {String} doc.projects
 * @param {String} doc.assignedTasks
 * @param {String} doc.createdAt
 * @returns {Model} User model
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidatior = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const SALT_ITERATIONS = parseInt(process.env.SALT_ITERATIONS || 8)

// hash :: String -> String -> Promise String
const hash = password => salt => bcrypt.hash(password, salt)

// validateUsername :: String -> Boolean
const validateUsername = str => str !== null && /^[a-z-0-9_]{3,20}$/.test(str)

// validateUsername :: String -> Boolean
const validatePassword = str => str !== null && str.length > 3

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Missing username'],
    validate: [
      validateUsername,
      'Invalid username: The username has to be between 3 - 20 characters and may only contain lowercase a-z, numbers, underscore (_) and dashes(-).'
    ],
    index: { unique: true }
  },
  password: {
    type: String,
    validate: [
      validatePassword,
      'The password has to be at least 3 characters long'
    ],
    required: [true, 'Missing password']
  },
  projects: {
    type: [Schema.Types.ObjectId],
    default: []
  },
  assignedTasks: {
    type: [Schema.Types.ObjectId],
    default: []
  },
  socketId: { type: String },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

// hashPasswordMiddleware :: callback(err, a) -> undefined
function hashPasswordMiddleware (next) {
  // Only hash new or modified passwords.
  if (!this.isModified('password')) {
    return next()
  }
  bcrypt
    .genSalt(SALT_ITERATIONS)
    .then(hash(this.password))
    .then(hashedPassword => {
      this.password = hashedPassword
      next()
    })
    .catch(next)
}

// Hash password before saving the user.
schema.pre('save', hashPasswordMiddleware)

schema.plugin(uniqueValidatior, {
  message: 'Sorry, the username "{VALUE}" already exists.'
})

module.exports = mongoose.model('User', schema)

module.exports.forTest = {
  hash,
  validateUsername,
  hashPasswordMiddleware
}
