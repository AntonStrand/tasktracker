const { describe, it, beforeEach } = require('mocha')
const expect = require('chai').expect
const {
  listAllTaskIds,
  fetchTasks,
  groupTasksByParent,
  tasksToState,
  createTaskState
} = require('./index')

describe.only('taskState', () => {
  describe('listAllTaskIds()', () => {
    it('should return all the task IDs as an Array of Strings', () => {
      const projects = [
        {
          tasks: ['123', '456']
        },
        {
          tasks: ['789', '101']
        }
      ]

      const expectedResult = ['123', '456', '789', '101']

      const result = listAllTaskIds(projects)
      expect(result).to.deep.equal(expectedResult)
    })
  })

  describe('fetchTasks()', () => {
    it('should return an Array of promises of Tasks', async () => {
      const taskRepo = {
        findById: id => Promise.resolve({ _id: id })
      }

      const taskIDs = ['123', '456', '789', '101']

      const expectedTasks = [
        { _id: '123' },
        { _id: '456' },
        { _id: '789' },
        { _id: '101' }
      ]

      const result = fetchTasks(taskRepo)(taskIDs)

      const tasks = await Promise.all(result)
      expect(result).to.be.an('array')
      expect(result[0]).to.be.a('promise')
      expect(tasks).to.deep.equal(expectedTasks)
    })
  })

  describe('groupTasksByParent()', () => {
    it('should return an Object grouped by parent id', () => {
      const tasks = [
        { id: '123', parent: { id: '1' } },
        { id: '456', parent: { id: '2' } },
        { id: '789', parent: { id: '1' } },
        { id: '101', parent: { id: '2' } },
        { id: '101', parent: { id: '3' } }
      ]

      const expectedResult = {
        '1': {
          '123': { id: '123', parent: { id: '1' } },
          '789': { id: '789', parent: { id: '1' } }
        },
        '2': {
          '456': { id: '456', parent: { id: '2' } },
          '101': { id: '101', parent: { id: '2' } }
        },
        '3': {
          '101': { id: '101', parent: { id: '3' } }
        }
      }

      const result = groupTasksByParent(tasks)

      expect(result).to.be.an('object')
      expect(result).to.deep.equal(expectedResult)
    })
  })
})
