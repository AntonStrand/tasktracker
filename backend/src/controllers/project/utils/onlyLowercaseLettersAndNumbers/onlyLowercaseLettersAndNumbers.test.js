const { describe, it } = require('mocha')
const expect = require('chai').expect

const onlyLowercaseLettersAndNumbers = require('./onlyLowercaseLettersAndNumbers')

describe('onlyLowercaseLetters()', () => {
  it('should convert capital letters to lowercase', () => {
    const testString = 'ALLCAPS'
    const expectedResult = 'allcaps'
    const result = onlyLowercaseLettersAndNumbers(testString)
    expect(result).to.equal(expectedResult)
  })

  it('should convert capital letters to lowercase and keep numbers', () => {
    const testString = 'ALLCAPS1234'
    const expectedResult = 'allcaps1234'
    const result = onlyLowercaseLettersAndNumbers(testString)
    expect(result).to.equal(expectedResult)
  })

  it('should remove white space', () => {
    const testString = 'A L L C A P S'
    const expectedResult = 'allcaps'
    const result = onlyLowercaseLettersAndNumbers(testString)
    expect(result).to.equal(expectedResult)
  })

  it('should special characters', () => {
    const testString = 'AL%L#C•AßP*S'
    const expectedResult = 'allcaps'
    const result = onlyLowercaseLettersAndNumbers(testString)
    expect(result).to.equal(expectedResult)
  })
})
