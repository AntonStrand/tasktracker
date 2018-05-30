const { describe, it, beforeEach, after } = require('mocha')
const expect = require('chai').expect
const projectRepository = require('./../../src/repositories/projectRepository')
const taskRepository = require('./../../src/repositories/taskRepository')
const userRepository = require('./../../src/repositories/userRepository')
const taskDB = require('./../../src/models/Task')
const userDB = require('./../../src/models/User')
const axios = require('axios')
require('./../../src/app')

const io = require('socket.io-client')

describe('Change task priority - Integration', () => {
  const options = {
    transports: ['websocket'],
    'force new connection': true
  }

  let token
  let projectId
  let taskId

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
              projectRepository
                .create({ title: 'Test', members: ['user'] })
                .then(project => {
                  projectId = project._id
                  return project
                })
            )
            .then(project =>
              userRepository.addProject('user', project._id).then(_ =>
                taskRepository
                  .create({
                    parent: { type: 'project', id: project._id },
                    title: 'new task',
                    assignees: ['username'],
                    priority: 2
                  })
                  .then(task => (taskId = task.id))
                  .catch(console.log)
              )
            )
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
      taskDB.remove({}, () => {
        done()
      })
    )
  })

  it('should change task priority', done => {
    const client = io.connect('http://localhost:8080', options)
    client.on('connect', function () {
      client.on('action', function (message) {
        expect(message.type).to.equal('task/TASK_ORDER_UPDATED')
        expect(message.tasks).to.be.an('object')
        expect(message.tasks[projectId][taskId].priority).to.equal(0)
        done()
      })
      client.emit('action', {
        type: 'ws/USER_AUTHENTICATED',
        user: { token }
      })
      setTimeout(
        () =>
          client.emit('action', {
            type: 'ws/CHANGE_TASK_PRIORITY',
            token,
            tasks: [
              {
                id: taskId,
                parent: { type: 'project', id: projectId },
                title: 'new task'
              }
            ]
          }),
        20
      )
    })
  })
})
