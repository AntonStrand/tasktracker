const { describe, it } = require('mocha')
const expect = require('chai').expect

const testFns = require('./../src/controllers/project/utils')

// saveProjectToMembers,
// onlyLowercaseLetters,
// stringToArray,
// createMemberList,
// isValidDateFormat,
// deadlineIsInFuture,
// newDate,
// isValidDate,
// createDeadline,
// createProjectDoc

describe('Project - Utils', () => {
  describe('onlyLowercaseLetters()', () => {
    it('should convert capital letters to lowercase', () => {
      const testString = 'ALLCAPS'
      const expectedResult = 'allcaps'
      const result = testFns.onlyLowercaseLettersAndNumbers(testString)
      expect(result).to.equal(expectedResult)
    })

    it('should convert capital letters to lowercase and keep numbers', () => {
      const testString = 'ALLCAPS1234'
      const expectedResult = 'allcaps1234'
      const result = testFns.onlyLowercaseLettersAndNumbers(testString)
      expect(result).to.equal(expectedResult)
    })

    it('should remove white space', () => {
      const testString = 'A L L C A P S'
      const expectedResult = 'allcaps'
      const result = testFns.onlyLowercaseLettersAndNumbers(testString)
      expect(result).to.equal(expectedResult)
    })

    it('should special characters', () => {
      const testString = 'AL%L#C•AßP*S'
      const expectedResult = 'allcaps'
      const result = testFns.onlyLowercaseLettersAndNumbers(testString)
      expect(result).to.equal(expectedResult)
    })
  })

  describe('stringToArray()', () => {
    it('should convert string to an array', () => {
      const testString = 'a string'
      const expectedResult = true
      const result = Array.isArray(testFns.stringToArray(testString))
      expect(result).to.equal(expectedResult)
    })

    it('should convert "all, is, fine" to an array with three items', () => {
      const testString = 'all, is, fine'
      const expectedResult = ['all', 'is', 'fine']
      const result = testFns.stringToArray(testString)
      result.forEach((item, i) => expect(item).to.equal(expectedResult[i]))
      expect(result.length).to.equal(3)
    })

    it('should remove duplicates', () => {
      const testString = 'all, is, fine, fine'
      const expectedResult = ['all', 'is', 'fine']
      const result = testFns.stringToArray(testString)
      result.forEach((item, i) => expect(item).to.equal(expectedResult[i]))
      expect(result.length).to.equal(3)
    })

    it('should remove empty items', () => {
      const testString = 'all, is, , ,fine,fine'
      const expectedResult = ['all', 'is', 'fine']
      const result = testFns.stringToArray(testString)
      result.forEach((item, i) => expect(item).to.equal(expectedResult[i]))
      expect(result.length).to.equal(3)
    })
  })
})
