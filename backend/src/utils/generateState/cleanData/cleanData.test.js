const { describe, it } = require('mocha')
const expect = require('chai').expect
const cleanData = require('./index')

describe('cleanData()', () => {
  it('should return an object with "id" and "_doc" should be flatten', () => {
    const testData = {
      _id: '123',
      _doc: {
        title: 'Test title'
      }
    }

    const expectedResult = {
      id: '123',
      title: 'Test title'
    }
    const result = cleanData(testData)
    expect(result).to.be.an('object')
    expect(result).to.deep.equal(expectedResult)
  })

  it('should ignore invalid object key names and return the rest', () => {
    const testData = {
      invalidId: '123',
      title: 'Test title'
    }

    const expectedResult = {
      id: undefined
    }
    const result = cleanData(testData)
    expect(result).to.be.an('object')
    expect(result).to.deep.equal(expectedResult)
  })
})
