const { describe, it, after, before } = require('mocha')
const expect = require('chai').expect
const userRepository = require('./../../src/repositories/userRepository')
const db = require('./../../src/models/User')
require('./../../src/app')
const mongoose = require('mongoose')

describe('User repository', () => {
  // Setup
  before(done => {
    // Empty db
    db.remove({}, done)
  })

  // Teardown
  after(() => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to application termination.'
      )
      process.exit(0)
    })
  })

  describe('save()', () => {
    it('should save a valid user', done => {
      const userData = { username: 'user', password: 'password' }
      userRepository
        .save(userData)
        .then(user => {
          expect(user.username).to.equal(userData.username)
          done()
        })
        .catch(done)
    })
    it('should reject an existing user', done => {
      const userData = { username: 'user', password: 'password' }
      userRepository
        .save(userData)
        .then(done)
        .catch(() => {
          expect(true).to.equal(true)
          done()
        })
    })
  })

  describe('findByUsername()', () => {
    it('should find existing user', done => {
      const username = 'user'
      userRepository
        .findByUsername(username)
        .then(user => {
          expect(user.username).to.equal(username)
          done()
        })
        .catch(done)
    })

    it("should throw error if user doesn't exist", done => {
      const username = 'non-user'
      userRepository
        .findByUsername(username)
        .then(done)
        .catch(() => {
          expect(true).to.equal(true)
          done()
        })
    })
  })

  describe('findById()', () => {
    it('should find existing user', done => {
      const userData = { username: 'user-id', password: 'password' }
      userRepository
        .save(userData)
        .then(({ _id }) => {
          userRepository
            .findById(_id)
            .then(user => {
              expect(user.username).to.equal(userData.username)
              done()
            })
            .catch(done)
        })
        .catch(done)
    })

    it("should throw error if user doesn't exist", done => {
      const id = 'non-user'
      userRepository
        .findById(id)
        .then(done)
        .catch(() => {
          expect(true).to.equal(true)
          done()
        })
    })
  })

  describe('addProject()', () => {
    it('should add the project id to an existing user', done => {
      const projectId = '5ad35e15eb75df06b364b6f1'
      const username = 'user'
      userRepository
        .addProject(username, projectId)
        .then(query => {
          expect(query.nModified).to.equal(1)
          done()
        })
        .catch(done)
    })

    it("should not add project id if the user doesn't exists", done => {
      const projectId = '5ad35e15eb75df06b364b6f1'
      const username = 'non-user'
      userRepository
        .addProject(username, projectId)
        .then(query => {
          expect(query.nModified).to.equal(0)
          done()
        })
        .catch(done)
    })

    it('should throw an error if the project id is invalid', done => {
      const projectId = 'invalid-id'
      const username = 'non-user'
      userRepository
        .addProject(username, projectId)
        .then(done)
        .catch(() => {
          expect(true).to.equal(true)
          done()
        })
    })
  })
})
