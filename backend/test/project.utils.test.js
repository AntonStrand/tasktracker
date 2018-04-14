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

  describe('isValidDateFormat()', () => {
    it('should approve 2018-04-13', () => {
      const testString = '2018-04-13'
      const expectedResult = true
      const result = testFns.isValidDateFormat(testString)
      expect(result).to.equal(expectedResult)
    })

    it('should fail 13/4 2018', () => {
      const testString = '13/4 2018'
      const expectedResult = false
      const result = testFns.isValidDateFormat(testString)
      expect(result).to.equal(expectedResult)
    })

    it('should fail 2018-04-13TBLA', () => {
      const testString = '2018-04-13TBLA'
      const expectedResult = false
      const result = testFns.isValidDateFormat(testString)
      expect(result).to.equal(expectedResult)
    })

    it('should fail empty string and null', () => {
      const expectedResult = false
      let result = testFns.isValidDateFormat(null)
      expect(result).to.equal(expectedResult)
      result = testFns.isValidDateFormat('')
      expect(result).to.equal(expectedResult)
    })

    it('should fail invalid dates', () => {
      const expectedResult = false
      const test = testFns.isValidDateFormat
      expect(test('2018-04-32')).to.equal(expectedResult)
      expect(test('2018-13-13')).to.equal(expectedResult)
      expect(test('2018-02-30')).to.equal(expectedResult)
    })
  })

  describe('newDate()', () => {
    it('should turn a dateString into a Date', () => {
      const testString = '2018-04-13'
      const expectedResult = 1523577600000
      const date = testFns.newDate(testString)
      expect(date instanceof Date).to.equal(true)
      expect(date.getTime()).to.equal(expectedResult)
    })
  })

  describe('deadlineIsInFuture()', () => {
    it('should return true if the provided date is in the future', () => {
      const futureDate = new Date('3001-01-01')
      const expectedResult = true
      const result = testFns.deadlineIsInFuture(futureDate)
      expect(result).to.equal(expectedResult)
    })

    it('should return false if the provided date has passed', () => {
      const futureDate = new Date('1982-05-11')
      const expectedResult = false
      const result = testFns.deadlineIsInFuture(futureDate)
      expect(result).to.equal(expectedResult)
    })
  })

  describe('isValidDate()', () => {
    it('should return true if the provided dateString is in the future', () => {
      const futureDateString = '3001-01-01'
      const expectedResult = true
      const result = testFns.isValidDate(futureDateString)
      expect(result).to.equal(expectedResult)
    })

    it('should return false if the provided date has passed', () => {
      const futureDateString = '1982-05-11'
      const expectedResult = false
      const result = testFns.isValidDate(futureDateString)
      expect(result).to.equal(expectedResult)
    })
  })

  describe('createDeadline()', () => {
    it('should return a Date object if the provided dateString is valid and in the future', () => {
      const futureDateString = '3001-01-01'
      const expectedResult = true
      const result = testFns.createDeadline(futureDateString)
      console.log(result)
      expect(result instanceof Date).to.equal(expectedResult)
    })

    it('should return null if the provided date has passed', () => {
      const futureDateString = '1982-05-11'
      const expectedResult = null
      const result = testFns.createDeadline(futureDateString)
      expect(result).to.equal(expectedResult)
    })

    it('should return null if the provided date is invalid', () => {
      const futureDateString = 'No-date-string'
      const expectedResult = null
      const result = testFns.createDeadline(futureDateString)
      expect(result).to.equal(expectedResult)
    })
  })
})
