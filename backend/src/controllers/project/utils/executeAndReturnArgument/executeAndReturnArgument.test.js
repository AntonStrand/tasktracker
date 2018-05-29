const { describe, it } = require('mocha')
const expect = require('chai').expect

const executeAndReturnArgument = require('./executeAndReturnArgument')

describe('executeAndReturnArgument', () => {
  it('should execute the function and return the provided argument', () => {
    const testData = 'hello'
    const testFunction = x => expect(x).to.equal(testData)
    const result = executeAndReturnArgument(testFunction, testData)
    expect(result).to.equal(testData)
  })
})
