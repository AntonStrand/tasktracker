const { describe, it } = require('mocha')
const expect = require('chai').expect

const add = (x, y) => x + y

describe('add', () => {
  it('Sum two numbers', () => {
    const x = 1
    const y = 9
    const expectedSum = 10

    const result = add(x, y)

    expect(result).to.be.equal(expectedSum)
  })
})
