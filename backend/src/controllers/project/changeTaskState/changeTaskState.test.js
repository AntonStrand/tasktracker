const { describe, it } = require('mocha')
const expect = require('chai').expect
const changeTaskState = require('./index')
const validateState = require('./index').validateState

describe('Change task state', () => {
  // Setup
  const io = {
    sockets: {
      in: () => ({ emit: () => {} })
    }
  }

  const socket = { emit: () => {} }

  describe('changeTaskState()', () => {
    it('should call repository.changeState() if both token and state is valid', () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWQiOiI1YWVjMjgxMjc2YWFiZTUyMGExNjA0NjgiLCJpYXQiOjE1MjU4NTk3MDEsImV4cCI6MTUyNTg2MzMwMX0.X7BDvU5c9Ja8-BJHtZXWCV8kox3a4quvPMtHizbCNoc'
      const state = 'todo'
      const mockRepo = {
        changeState: _ => newState => {
          expect(newState).to.equal(state)
          return Promise.resolve({ parent: { id: '123' } })
        }
      }
      changeTaskState(mockRepo)(io, socket, { token, state })
    })
  })

  describe('changeTaskState()', () => {
    it('should NOT call repository.changeState() if token is invalid', () => {
      const token = 'invalid'
      const state = 'todo'
      let result = 0
      const mockRepo = {
        changeState: _ => () => {
          result++
          return Promise.resolve({ parent: { id: '123' } })
        }
      }
      changeTaskState(mockRepo)(io, socket, { token, state })
      expect(result).to.equal(0)
    })
  })

  describe('changeTaskState()', () => {
    it('should NOT call repository.changeState() if state is invalid', () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWQiOiI1YWVjMjgxMjc2YWFiZTUyMGExNjA0NjgiLCJpYXQiOjE1MjU4NTk3MDEsImV4cCI6MTUyNTg2MzMwMX0.X7BDvU5c9Ja8-BJHtZXWCV8kox3a4quvPMtHizbCNoc'
      const state = ' Not an existing state '
      let result = 0
      const mockRepo = {
        changeState: _ => () => {
          result++
          return Promise.resolve({ parent: { id: '123' } })
        }
      }
      changeTaskState(mockRepo)(io, socket, { token, state })
      expect(result).to.equal(0)
    })
  })

  describe('validateState()', () => {
    it('should return lower cased trimmed Just String if the state is valid', () => {
      const testData = ' Todo '
      const expectedResult = 'todo'
      const result = validateState(testData)
      expect(result.getOrElse('')).to.equal(expectedResult)
    })

    it('should return Noting if the state is invalid', () => {
      const testData = ' Not an existing state '
      const expectedResult = 'Nothing'
      const result = validateState(testData)
      expect(result.getOrElse('Nothing')).to.equal(expectedResult)
    })
  })
})
