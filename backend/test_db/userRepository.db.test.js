const { describe, it, after, before } = require('mocha')
const expect = require('chai').expect
const userRepository = require('./../src/repositories/userRepository')
const db = require('./../src/models/User')
require('./../src/app')

describe('User repository', () => {
  // Setup
  before(done => {
    // Empty db
    db.remove({}, done)
  })

  // Teardown
  after(() => {
    process.exit()
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
  // describe('update()')
})
