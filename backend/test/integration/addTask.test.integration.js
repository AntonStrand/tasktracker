const { describe, it, beforeEach, after } = require('mocha')
const expect = require('chai').expect
const taskRepository = require('./../../src/repositories/taskRepository')
const userRepository = require('./../../src/repositories/userRepository')
const taskDB = require('./../../src/models/Task')
const userDB = require('./../../src/models/User')
const mongoose = require('mongoose')
const axios = require('axios')
require('./../../src/app')

const io = require('socket.io-client')

describe('Add Task - Integration', () => {
  const options = {
    transports: ['websocket'],
    'force new connection': true
  }

  let token

  // Setup
  beforeEach(done => {
    // Start application
    userDB
      .remove({}, () =>
        taskDB.remove({}, () =>
          userRepository
            .save({
              username: 'user',
              password: '1234'
            })
            .then(() =>
              axios
                .post('http://localhost:8080/api/login', {
                  username: 'user',
                  password: '1234'
                })
                .then(({ data }) => (token = data.user.token))
            )
            .then(() => done())
            .catch(done)
        )
      )
      .catch(done)
  })

  after(() => {
    userDB.remove({}, () =>
      taskDB.remove({}, () => {
        mongoose.connection.close(() => {
          process.exit(0)
        })
      })
    )
  })

  it('should add a task if username is valid', done => {
    const client = io.connect('http://localhost:8080', options)
    client.on('connect', function () {
      client.on('action', function (message) {
        expect(message.type).to.equal('task/NEW_TASK_CREATED')
        expect(message.task).to.be.an('object')
        taskRepository
          .findById(message.task.id)
          .then(task => {
            expect(task.title).to.equal(message.task.title)
            expect(task.parent.id.toString()).to.equal(message.task.parent.id)
            client.disconnect()
            done()
          })
          .catch(done)
      })

      client.emit('action', {
        type: 'ws/CREATE_NEW_TASK',
        token,
        formData: {
          parent: { type: 'project', id: '5aec8ff37577706238f89340' },
          taskName: 'new task'
        }
      })
    })
  })
  it('should emit a ACCESS_DENIED and not add a task if username is invalid', done => {
    const client = io.connect('http://localhost:8080', options)
    client.on('connect', function () {
      client.on('action', function (message) {
        expect(message.type).to.equal('user/ACCESS_DENIED')
        expect(message.message).to.equal('Access denied.')
        taskRepository
          .findAll()
          .then(tasks => {
            expect(tasks.length).to.equal(0)
            client.disconnect()
            done()
          })
          .catch(done)
      })

      client.emit('action', {
        type: 'ws/CREATE_NEW_TASK',
        token: 'invalid',
        formData: {
          parent: { type: 'project', id: '5aec8ff37577706238f89340' },
          taskName: 'new task'
        }
      })
    })
  })
  it('should emit a VALIDATION_ERROR and not add a task if task data is invalid', done => {
    const client = io.connect('http://localhost:8080', options)
    client.on('connect', function () {
      client.on('action', function (message) {
        expect(message.type).to.equal('form/VALIDATION_ERROR')
        expect(message.formId).to.equal('task')
        expect(message.error).to.equal("Sorry, the task couldn't be added.")
        taskRepository
          .findAll()
          .then(tasks => {
            expect(tasks.length).to.equal(0)
            client.disconnect()
            done()
          })
          .catch(done)
      })

      client.emit('action', {
        type: 'ws/CREATE_NEW_TASK',
        token,
        formData: {
          parent: { type: 'project', id: '5aec8ff37577706238f89340' },
          taskName: { title: '12345678' }
        }
      })
    })
  })
})
