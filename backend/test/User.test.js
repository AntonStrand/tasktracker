const { describe, it } = require('mocha')
const expect = require('chai').expect
const {
  hash,
  validateUsername
  // hashPasswordMiddleware
} = require('./../src/models/User').forTest

describe('User', () => {
  describe('hash()', () => {
    it('should return a hashed string', () => {
      const testString = 'password'
      hash(testString)(5).then(result =>
        expect(result).to.not.equal(testString)
      )
    })
  })

  describe('validateUsername()', () => {
    it('should return true if username is valid', () => {
      const testString = 'Username'
      const result = validateUsername(testString)
      expect(result).to.equal(true)
    })

    it('should return false if username is to short', () => {
      const testString = 'U'
      const result = validateUsername(testString)
      expect(result).to.equal(false)
    })

    it('should return false if username is to long', () => {
      const testString = 'UsernameIsLongerThanTwentyCharachtars'
      const result = validateUsername(testString)
      expect(result).to.equal(false)
    })

    it('should return false if username is invalid', () => {
      const testString = '()=)(EW'
      const result = validateUsername(testString)
      expect(result).to.equal(false)
    })

    it('should return false if username is null', () => {
      const testString = null
      const result = validateUsername(testString)
      expect(result).to.equal(false)
    })
  })
  // describe('hashPasswordMiddleware()', () => {
  //   it('should return a hashed string', () => {
  //     const getThis = {
  //       password: 'password',
  //       isModified: x => false
  //     }
  //     const cb = () => {
  //       console.log('was called')
  //       const wasCalled = true
  //       expect(wasCalled).to.equal(true)
  //     }

  //     hashPasswordMiddleware(cb).bind(getThis)
  //   })
  // })
})
