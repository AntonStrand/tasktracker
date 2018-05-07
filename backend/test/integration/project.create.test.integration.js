const { describe, it, beforeEach, after } = require('mocha')
const expect = require('chai').expect
const projectRepository = require('./../../src/repositories/projectRepository')
const userRepository = require('./../../src/repositories/userRepository')
const projectDB = require('./../../src/models/Project')
const userDB = require('./../../src/models/User')
const axios = require('axios')
require('./../../src/app')

const io = require('socket.io-client')

describe.only('Create Project - Integration', () => {
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
        projectDB.remove({}, () =>
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

  after(done => {
    userDB.remove({}, () =>
      projectDB.remove({}, () => {
        done()
      })
    )
  })

  it('should create project if username is valid', done => {
    const client = io.connect('http://localhost:8080', options)
    client.on('connect', function () {
      client.on('action', function (message) {
        expect(message.type).to.equal('project/NEW_PROJECT_CREATED')
        expect(message.project).to.be.an('object')
        expect(message.project.deadline).to.equal(null)
        expect(message.project.members).to.deep.equal([
          'john',
          'paul',
          'george',
          'ringo',
          'user'
        ])
        projectRepository
          .findById(message.project.id)
          .then(project => {
            expect(project.title).to.equal(message.project.title)
            expect(project.members).to.deep.equal(message.project.members)
            client.disconnect()
            done()
          })
          .catch(done)
      })

      client.emit('action', {
        type: 'ws/CREATE_NEW_PROJECT',
        token,
        formData: {
          deadline: '',
          description: 'Describing my project',
          members: 'john, paul, george, ringo ',
          tags: 'test, project',
          title: 'One more project'
        }
      })
    })
  })
  it('should emit a ACCESS_DENIED and not add a project if username is invalid', done => {
    const client = io.connect('http://localhost:8080', options)
    client.on('connect', function () {
      client.on('action', function (message) {
        expect(message.type).to.equal('user/ACCESS_DENIED')
        expect(message.message).to.equal('Access denied.')
        projectRepository
          .findAll()
          .then(projects => {
            expect(projects.length).to.equal(0)
            client.disconnect()
            done()
          })
          .catch(done)
      })

      client.emit('action', {
        type: 'ws/CREATE_NEW_PROJECT',
        token: 'invalid',
        formData: {
          deadline: '',
          description: 'Describing my project',
          members: 'john, paul, george, ringo ',
          tags: 'test, project',
          title: 'One more project'
        }
      })
    })
  })
  it('should emit a VALIDATION_ERROR and not add a task if title is missing', done => {
    const client = io.connect('http://localhost:8080', options)
    client.on('connect', function () {
      client.on('action', function (message) {
        expect(message.type).to.equal('form/VALIDATION_ERROR')
        expect(message.formId).to.equal('project')
        expect(message.error).to.equal(
          "Sorry, the project couldn't be created."
        )
        projectRepository
          .findAll()
          .then(projects => {
            expect(projects.length).to.equal(0)
            client.disconnect()
            done()
          })
          .catch(done)
      })

      client.emit('action', {
        type: 'ws/CREATE_NEW_PROJECT',
        token,
        formData: {
          deadline: '',
          description: 'Describing my project',
          members: 'john, paul, george, ringo ',
          tags: 'test, project'
        }
      })
    })
  })
})
