const { describe, it, beforeEach, after } = require('mocha')
const expect = require('chai').expect
const taskRepository = require('./../../src/repositories/taskRepository')
const db = require('./../../src/models/Task')
require('./../../src/app')

describe('Task repository', () => {
  // Setup
  const clearDB = () => db.remove({})
  beforeEach(clearDB)
  after(clearDB)

  describe('create()', () => {
    it('should save a task', done => {
      const taskData = {
        title: 'New task',
        parent: { type: 'Project', id: '5adf29ab0148878a48c8394a' },
        assignees: ['username']
      }
      taskRepository
        .create(taskData)
        .then(task => {
          expect(task.title).to.equal(taskData.title)
          done()
        })
        .catch(done)
    })

    it('should throw an error if title is missing', done => {
      const taskData = {
        parent: { type: 'Project', id: '5adf29ab0148878a48c8394a' }
      }
      taskRepository
        .create(taskData)
        .then(done)
        .catch(({ errors }) => {
          expect(errors.title.message).to.equal('No task was added.')
          done()
        })
    })

    it('should throw an error if parent is missing', done => {
      const taskData = { title: 'Task' }
      taskRepository
        .create(taskData)
        .then(done)
        .catch(({ errors }) => {
          expect(errors['parent.type'].message).to.equal(
            'Parent type is missing.'
          )
          expect(errors['parent.id'].message).to.equal('Parent id is missing.')
          done()
        })
    })
  })

  describe('findById()', () => {
    it('should find a task based on a valid id', done => {
      const taskData = {
        title: 'New task',
        parent: { type: 'Project', id: '5adf29ab0148878a48c8394a' },
        assignees: ['username']
      }
      taskRepository
        .create(taskData)
        .then(({ _id }) => {
          taskRepository.findById(_id).then(task => {
            expect(task.title).to.equal(task.title)
            done()
          })
        })
        .catch(done)
    })

    it('should throw an error if id is invalid', done => {
      taskRepository
        .findById('invalid-id')
        .then(done)
        .catch(err => {
          expect(err.value).to.equal('invalid-id')
          done()
        })
    })
  })
})
