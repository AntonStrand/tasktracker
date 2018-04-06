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

const Schema = require('mongoose').Schema
const mongoose = require('mongoose')
const uniqueValidatior = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const SALT_ITERATIONS = parseInt(process.env.SALT_ITERATIONS || 8)

// hash :: String -> String -> Promise String
const hash = password => salt => bcrypt.hash(password, salt)

// validateUsername :: String -> Boolean
const validateUsername = str =>
  str !== null && /^[a-zA-Z-0-9_]{3,20}$/.test(str)

// TODO: Validate password.

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Missing username'],
    validate: [
      validateUsername,
      'Invalid username: The username has to be between 3 - 20 characters and may only contain A-Z, 0-9 - _.'
    ],
    index: { unique: true }
  },
  password: {
    type: String,
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

// convert username to lowercase
function usernameToLowerCase (next) {
  if (this.username && typeof this.username === 'string') {
    this.username = this.username.toLowerCase()
  }
  next()
}

// Hash password before saving the user.
schema.pre('save', hashPasswordMiddleware)

schema.pre('save', usernameToLowerCase)

schema.plugin(uniqueValidatior, {
  message: 'Error, expected {PATH} to be unique.'
})

module.exports = mongoose.model('User', schema)

module.exports.forTest = {
  hash,
  validateUsername,
  hashPasswordMiddleware
}
