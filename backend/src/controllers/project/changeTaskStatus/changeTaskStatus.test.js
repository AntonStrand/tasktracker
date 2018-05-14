const { describe, it } = require('mocha')
const expect = require('chai').expect
const changeTaskStatus = require('./index')
const validateStatus = require('./index').validateStatus

describe('Change task status', () => {
  // Setup
  const io = {
    sockets: {
      in: () => ({ emit: () => {} })
    }
  }

  const socket = { emit: () => {} }

  describe('changeTaskStatus()', () => {
    it('should call repository.changeStatus() if both token and status is valid', () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWQiOiI1YWVjMjgxMjc2YWFiZTUyMGExNjA0NjgiLCJpYXQiOjE1MjU4NTk3MDEsImV4cCI6MTUyNTg2MzMwMX0.X7BDvU5c9Ja8-BJHtZXWCV8kox3a4quvPMtHizbCNoc'
      const state = 'todo'
      const mockRepo = {
        changeState: _ => newState => {
          expect(newState).to.equal(state)
          return Promise.resolve({ parent: { id: '123' } })
        }
      }
      changeTaskStatus(mockRepo)(io, socket, { token, state })
    })
  })

  describe('changeTaskStatus()', () => {
    it('should NOT call repository.changeStatus() if token is invalid', () => {
      const token = 'invalid'
      const state = 'todo'
      let result = 0
      const mockRepo = {
        changeState: _ => () => {
          result++
          return Promise.resolve({ parent: { id: '123' } })
        }
      }
      changeTaskStatus(mockRepo)(io, socket, { token, state })
      expect(result).to.equal(0)
    })
  })

  describe('changeTaskStatus()', () => {
    it('should NOT call repository.changeStatus() if status is invalid', () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWQiOiI1YWVjMjgxMjc2YWFiZTUyMGExNjA0NjgiLCJpYXQiOjE1MjU4NTk3MDEsImV4cCI6MTUyNTg2MzMwMX0.X7BDvU5c9Ja8-BJHtZXWCV8kox3a4quvPMtHizbCNoc'
      const state = ' Not an existing status '
      let result = 0
      const mockRepo = {
        changeState: _ => () => {
          result++
          return Promise.resolve({ parent: { id: '123' } })
        }
      }
      changeTaskStatus(mockRepo)(io, socket, { token, state })
      expect(result).to.equal(0)
    })
  })

  describe('validateStatus()', () => {
    it('should return lower cased trimmed Just String if the status is valid', () => {
      const testData = ' Todo '
      const expectedResult = 'todo'
      const result = validateStatus(testData)
      expect(result.getOrElse('')).to.equal(expectedResult)
    })

    it('should return Noting if the status is invalid', () => {
      const testData = ' Not an existing state '
      const expectedResult = 'Nothing'
      const result = validateStatus(testData)
      expect(result.getOrElse('Nothing')).to.equal(expectedResult)
    })
  })
})
