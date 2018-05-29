const { describe, it } = require('mocha')
const expect = require('chai').expect

const arrayToIndex = require('./arrayToIndex')

describe('arrayToIndex()', () => {
  it('should turn an array of objects to one object grouped by the "id" key', () => {
    const testData = [
      { id: '123', title: 'title1' },
      { id: '456', title: 'title2' },
      { id: '789', title: 'title3' }
    ]
    const expectedResult = {
      '123': { id: '123', title: 'title1' },
      '456': { id: '456', title: 'title2' },
      '789': { id: '789', title: 'title3' }
    }
    const result = arrayToIndex(testData)
    expect(result).to.deep.equal(expectedResult)
  })
})
