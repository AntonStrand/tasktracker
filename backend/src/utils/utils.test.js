/* eslint-disable */
const { describe, it } = require('mocha')
const expect = require('chai').expect

const {
  isNotNil,
  alwaysFalse,
  filterAsync,
  isNilOrEmpty,
  isNotNilNorEmpty,
  alwaysNull,
  removeNull
} = require('./index')

describe('Utils', () => {
  describe('isNotNil()', () => {
    it('should return true if not null or undefined', () => {
      expect(isNotNil('Hello')).to.be.true
      expect(isNotNil(true)).to.be.true
      expect(isNotNil(false)).to.be.true
      expect(isNotNil(1)).to.be.true
      expect(isNotNil({})).to.be.true
    })
    it('should return false if null or undefined', () => {
      expect(isNotNil(null)).to.be.false
      expect(isNotNil(undefined)).to.be.false
    })
  })

  describe('filterAsync', () => {
    const testData = [1, 2, 3, 4]
    const expectedResult = [1, 3]

    it('should handle an asynchronous predicate function', async () => {
      const isAsyncOdd = x => Promise.resolve(x % 2 > 0)
      const result = await filterAsync(isAsyncOdd, testData)
      expect(result).to.deep.equal(expectedResult)
    })
    it('should handle a synchronous predicate function', async () => {
      const isOdd = x => x % 2 > 0
      const result = await filterAsync(isOdd, testData)
      expect(result).to.deep.equal(expectedResult)
    })
    it('should handle an empty array', async () => {
      const isOdd = x => x % 2 > 0
      const result = await filterAsync(isOdd, [])
      expect(result).to.deep.equal([])
    })
  })
})
