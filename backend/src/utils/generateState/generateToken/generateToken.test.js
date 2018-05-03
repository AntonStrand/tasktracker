const { describe, it, beforeEach } = require('mocha')
const expect = require('chai').expect
const generateToken = require('./index')
const realJWT = require('jsonwebtoken')

describe.only('generateToken()', () => {
  const jwt = {}
  const user = {
    username: 'user',
    _id: '123'
  }

  beforeEach(function () {
    jwt.sign = null
  })

  it('should send in matching username and id to sign', () => {
    const expectedResult = {
      username: 'user',
      id: '123'
    }

    jwt.sign = obj => expect(obj).to.deep.equal(expectedResult)

    generateToken(jwt)(user)
  })

  it('should send a secret that matches the process.env.JWT_KEY', () => {
    const expectedResult = process.env.JWT_KEY

    jwt.sign = (obj, secret) => expect(secret).to.equal(expectedResult)

    generateToken(jwt)(user)
  })

  it('should send in expire', () => {
    jwt.sign = (obj, secret, expire) => expect(expire).to.not.equal(null)

    generateToken(jwt)(user)
  })

  it('should should return a token', () => {
    const result = generateToken(realJWT)(user)
    expect(result).to.be.a('string')
  })
})
