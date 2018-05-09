/* eslint-disable */
const { describe, it, beforeEach, after } = require('mocha')
const expect = require('chai').expect
const userRepository = require('./../../src/repositories/userRepository')
const userDB = require('./../../src/models/User')
const axios = require('axios')
require('./../../src/app')

const io = require('socket.io-client')

describe('Add socket.id to User - Integration', () => {
  const options = {
    transports: ['websocket'],
    'force new connection': true
  }

  let token
  let userId

  // Setup
  beforeEach(done => {
    // Start application
    userDB
      .remove({}, () =>
        userRepository
          .save({
            username: 'user',
            password: '1234'
          })
          .then(user => (userId = user._id))
          .then(() =>
            axios
              .post('http://localhost:8080/api/login', {
                username: 'user',
                password: '1234'
              })
              .then(({ data }) => (token = data.user.token))
          )
          .then(() => done())
      )
      .catch(done)
  })

  after(done => {
    userDB.remove({}, done)
  })

  it('should add socket.id if token is valid', done => {
    try {
      const client = io.connect('http://localhost:8080', options)
      client.on('connect', function() {
        client.emit('action', {
          type: 'ws/USER_AUTHENTICATED',
          token
        })
      })
      setTimeout(async () => {
        const user = await userRepository.findById(userId)
        expect(user.socketId).to.not.be.null
        client.disconnect()
        done()
      }, 50)
    } catch (error) {
      done(error)
    }
  })

  it('should not add socket.id if token is invalid', done => {
    try {
      const client = io.connect('http://localhost:8080', options)
      client.on('connect', function() {
        client.emit('action', {
          type: 'ws/USER_AUTHENTICATED',
          token: 'invalid'
        })
      })
      setTimeout(async () => {
        const user = await userRepository.findById(userId)
        expect(user.socketId).to.be.undefined
        client.disconnect()
        done()
      }, 50)
    } catch (error) {
      done(error)
    }
  })
})
