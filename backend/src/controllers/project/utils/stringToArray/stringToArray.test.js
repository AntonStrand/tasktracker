const { describe, it } = require('mocha')
const expect = require('chai').expect

const stringToArray = require('./stringToArray')

describe('stringToArray()', () => {
  it('should convert string to an array', () => {
    const testString = 'a string'
    const expectedResult = true
    const result = Array.isArray(stringToArray(testString))
    expect(result).to.equal(expectedResult)
  })

  it('should convert "all, is, fine" to an array with three items', () => {
    const testString = 'all, is, fine'
    const expectedResult = ['all', 'is', 'fine']
    const result = stringToArray(testString)
    result.forEach((item, i) => expect(item).to.equal(expectedResult[i]))
    expect(result.length).to.equal(3)
  })

  it('should remove duplicates', () => {
    const testString = 'all, is, fine, fine'
    const expectedResult = ['all', 'is', 'fine']
    const result = stringToArray(testString)
    result.forEach((item, i) => expect(item).to.equal(expectedResult[i]))
    expect(result.length).to.equal(3)
  })

  it('should remove empty items', () => {
    const testString = 'all, is, , ,fine,fine'
    const expectedResult = ['all', 'is', 'fine']
    const result = stringToArray(testString)
    result.forEach((item, i) => expect(item).to.equal(expectedResult[i]))
    expect(result.length).to.equal(3)
  })
})
