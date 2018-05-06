const { describe, it, beforeEach, after } = require('mocha')
const expect = require('chai').expect
const userRepository = require('./../../src/repositories/userRepository')
const db = require('./../../src/models/User')
const request = require('supertest')
const mongoose = require('mongoose')

require('./../../src/app')
// const app = require('http://localhost:8000')

describe('Login', () => {
  // Setup
  beforeEach(done => {
    // Empty db
    db.remove({}, () => {
      userRepository
        .save({
          username: 'user',
          password: '1234'
        })
        .then(() => done())
        .catch(done)
    })
  })

  after(() => {
    db.remove({}, () => {
      mongoose.connection.close(() => {
        process.exit(0)
      })
    })
  })

  it('should return state to existing user', done => {
    const user = {
      username: 'user',
      password: '1234'
    }

    request('http://localhost:8080')
      .post('/api/login')
      .send(user)
      .then(({ body }) => {
        expect(body).to.be.an('object')

        expect(body.user)
          .to.have.a.property('token')
          .and.to.be.a('string')

        expect(body.projects).to.include({ count: 0 })
        expect(body.tasks).to.include({ count: 0 })
      })
      .then(done)
      .catch(done)
  })
  it("should respond with an error if the user doesn't exsist", () => {
    const user = {
      username: 'nobody',
      password: '1234'
    }

    request('http://localhost:8080')
      .post('/api/login')
      .send(user)
      .expect({ error: 'Wrong username or password.' })
  })

  it('should respond with an error if the password is incorrect', () => {
    const user = {
      username: 'user',
      password: 'wrong'
    }

    request('http://localhost:8080')
      .post('/api/login')
      .send(user)
      .expect({ error: 'Wrong username or password.' })
  })
})
