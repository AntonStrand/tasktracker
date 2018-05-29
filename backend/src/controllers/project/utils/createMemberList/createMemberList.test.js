const { describe, it } = require('mocha')
const expect = require('chai').expect

const createMemberList = require('./createMemberList')

describe('createMemberList()', () => {
  it('should return all existing users in an array', async () => {
    const users = 'paul, john, george, ringo'
    const isUser = name => Promise.resolve(name.length > 4)
    const expectedResult = ['george', 'ringo']
    const result = await createMemberList(isUser)(users)
    expect(result).to.deep.equal(expectedResult)
  })
})
