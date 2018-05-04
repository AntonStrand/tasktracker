const { describe, it } = require('mocha')
const expect = require('chai').expect
const { indexProjects, getIndexLength, createProjectState } = require('./index')

describe('projectState', () => {
  describe('indexProjects()', () => {
    it('should convert an Array to an Object with the id:s as keys', () => {
      const testData = [
        { id: '1', title: 'Project 1' },
        { id: '2', title: 'Project 2' },
        { id: '3', title: 'Project 3' }
      ]
      const expectedResult = {
        '1': { id: '1', title: 'Project 1' },
        '2': { id: '2', title: 'Project 2' },
        '3': { id: '3', title: 'Project 3' }
      }

      const result = indexProjects(testData)
      expect(result).to.be.an('object')
      expect(result).to.deep.equal(expectedResult)
    })
  })

  describe('getIndexLength()', () => {
    it('should return 3 if an Object contains 3 keys', () => {
      const testData = {
        '1': { id: '1', title: 'Project 1' },
        '2': { id: '2', title: 'Project 2' },
        '3': { id: '3', title: 'Project 3' }
      }

      const expectedResult = 3

      const result = getIndexLength(testData)
      expect(result).to.equal(expectedResult)
    })

    it('should return 0 if an Object is empty', () => {
      const testData = {}

      const expectedResult = 0

      const result = getIndexLength(testData)
      expect(result).to.equal(expectedResult)
    })

    it('should return 0 if the input is null', () => {
      const testData = null

      const expectedResult = 0

      const result = getIndexLength(testData)
      expect(result).to.equal(expectedResult)
    })
    it('should return 0 if the input is a String', () => {
      const testData = 'null'

      const expectedResult = 0

      const result = getIndexLength(testData)
      expect(result).to.equal(expectedResult)
    })
  })
})
