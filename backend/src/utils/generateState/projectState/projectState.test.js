const { describe, it } = require('mocha')
const expect = require('chai').expect
const {
  indexProjects,
  getIndexLength,
  indexToState,
  createProjectState
} = require('./index')

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

    it('should throw an Error if argument is null', () => {
      const testData = null
      try {
        getIndexLength(testData)
      } catch (error) {
        expect(error).to.not.equal(null)
      }
    })

    it('should throw an Error if argument is a String', () => {
      const testData = 'String'
      try {
        getIndexLength(testData)
      } catch (error) {
        expect(error).to.not.equal(null)
      }
    })
  })

  describe('indexToState', () => {
    it('should take project index and turn it into a project state', () => {
      const testData = {
        '1': { id: '1', title: 'Project 1' },
        '2': { id: '2', title: 'Project 2' },
        '3': { id: '3', title: 'Project 3' }
      }

      const expectedResult = {
        projectsById: testData,
        count: 3
      }

      const result = indexToState(testData)
      expect(result).to.deep.equal(expectedResult)
    })
    it('should throw an error in case it argument is not an Object', () => {
      const testData = null
      try {
        indexToState(testData)
      } catch (error) {
        expect(error).to.not.equal(null)
      }
    })
  })

  // describe('createProjectState', () => {
  //   it(
  //     "should return an Object containing the number of projects and it's data", () => {
  //       const projectRepo = {
  //         findById: id => ({})
  //       }
  //     }
  //   )
  //   it('should throw an Error in case something goes wrong')
  // })
})
