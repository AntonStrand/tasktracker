/* eslint-disable */
const { describe, it } = require('mocha')
const expect = require('chai').expect

const isUser = require('./isUser')

describe('isUser()', () => {
  it('Return true if the user exist', async () => {
    const repo = { findByUsername: () => Promise.resolve(true) }
    const testData = { username: 'user' }
    const result = await isUser(repo)(testData)
    expect(result).to.be.true
  })

  it("Return false if the user doesn't exist", async () => {
    const repo = { findByUsername: () => Promise.resolve(null) }
    const testData = { username: 'user' }
    const result = await isUser(repo)(testData)
    expect(result).to.be.false
  })

  it('Return false if there was an error', async () => {
    const repo = { findByUsername: () => Promise.reject(Error()) }
    const testData = { username: 'user' }
    const result = await isUser(repo)(testData)
    expect(result).to.be.false
  })
})
