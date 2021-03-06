const { describe, it } = require('mocha')
const expect = require('chai').expect
const {
  listAllTaskIds,
  fetchTasks,
  groupTasksByParent,
  tasksToState,
  createTaskState
} = require('./index')

describe('taskState', () => {
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

  describe('tasksToState()', () => {
    it('should return an Object formated as the task state', async () => {
      const tasks = [
        Promise.resolve({ _id: '123', _doc: { parent: { id: '1' } } }),
        Promise.resolve({ _id: '456', _doc: { parent: { id: '2' } } }),
        Promise.resolve({ _id: '789', _doc: { parent: { id: '1' } } }),
        Promise.resolve({ _id: '101', _doc: { parent: { id: '2' } } }),
        Promise.resolve({ _id: '101', _doc: { parent: { id: '3' } } })
      ]

      const expectedResult = {
        groupedByParent: {
          '1': {
            '789': { id: '789', parent: { id: '1' } },
            '123': { id: '123', parent: { id: '1' } }
          },
          '2': {
            '101': { id: '101', parent: { id: '2' } },
            '456': { id: '456', parent: { id: '2' } }
          },
          '3': {
            '101': { id: '101', parent: { id: '3' } }
          }
        },
        count: 5
      }

      const result = await tasksToState(tasks)

      expect(result).to.be.an('object')
      expect(result).to.deep.equal(expectedResult)
    })

    it('should not catch eventual errors', async () => {
      const tasks = [Promise.reject(Error('An error'))]

      try {
        await tasksToState(tasks)
      } catch (error) {
        expect(error).to.be.an('error')
        expect(error.message).to.equal('An error')
      }
    })
  })
  describe('createTaskState()', () => {
    it('should return an Object formated as the task state', async () => {
      const matchingId = (ids, id) => ids.find(x => x === id)

      const projectRepo = {
        findById: id =>
          Promise.resolve({
            _id: id,
            _doc: {
              title: id,
              tasks: matchingId(['1'], id)
                ? ['123', '789']
                : matchingId(['2'], id)
                  ? ['456', '101']
                  : ['102']
            }
          })
      }

      const taskRepo = {
        findById: id =>
          Promise.resolve({
            _id: id,
            _doc: {
              title: id,
              parent: {
                id: matchingId(['123', '789'], id)
                  ? '1'
                  : matchingId(['101', '456'], id)
                    ? '2'
                    : '3'
              }
            }
          })
      }
      const user = {
        projects: ['1', '2', '3']
      }

      const expectedResult = {
        groupedByParent: {
          '1': {
            '789': { id: '789', title: '789', parent: { id: '1' } },
            '123': { id: '123', title: '123', parent: { id: '1' } }
          },
          '2': {
            '101': { id: '101', title: '101', parent: { id: '2' } },
            '456': { id: '456', title: '456', parent: { id: '2' } }
          },
          '3': {
            '102': { id: '102', title: '102', parent: { id: '3' } }
          }
        },
        count: 5
      }

      const result = await createTaskState(projectRepo, taskRepo, user)

      expect(result).to.be.an('object')
      expect(result).to.deep.equal(expectedResult)
    })
  })
})
