const { describe, it } = require('mocha')
const expect = require('chai').expect
const { createTaskDoc, addTaskToAssignees } = require('./index')

describe('Add Task', () => {
  describe('createTaskDoc()', () => {
    it('should return an object containing the provided arguments', () => {
      const testData = {
        parent: { type: 'project', id: '123' },
        taskName: 'new task'
      }
      const username = 'username'

      const expectedResult = {
        title: 'new task',
        parent: { type: 'project', id: '123' },
        assignees: [username]
      }

      const result = createTaskDoc(testData)(username)
      expect(result).to.deep.equal(expectedResult)
    })
  })
  describe('addTaskToAssignees()', () => {
    it('should call addAssignedTask() for each assignee w/ username and id', async () => {
      const assignees = ['george', 'ringo', 'paul', 'john']

      const testData = {
        title: 'new task',
        parent: { type: 'project', id: '123' },
        assignees,
        _id: '456'
      }

      let result = []
      const expectedResult = [
        ['george', '456'],
        ['ringo', '456'],
        ['paul', '456'],
        ['john', '456']
      ]
      const userRepo = {
        addAssignedTask: (username, id) => {
          result.push([username, id])
          return Promise.resolve({})
        }
      }

      await addTaskToAssignees(userRepo, testData)
      expect(result).to.deep.equal(expectedResult)
    })
    it('should return an array of promises', async () => {
      const assignees = ['george', 'ringo', 'paul', 'john']

      const testData = {
        title: 'new task',
        parent: { type: 'project', id: '123' },
        assignees,
        _id: '456'
      }

      const userRepo = {
        addAssignedTask: (username, id) => {
          return Promise.resolve({ username, id })
        }
      }

      const result = await addTaskToAssignees(userRepo, testData)

      expect(result).to.be.an('array')
      expect(result[0]).to.be.a('promise')
    })
  })
})
