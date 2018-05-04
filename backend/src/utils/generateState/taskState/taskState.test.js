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
  const jwt = {}
  const user = {
    username: 'user',
    _id: '123'
  }

  beforeEach(function () {
    jwt.sign = null
  })

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
})
