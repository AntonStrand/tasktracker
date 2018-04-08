const { describe, it } = require('mocha')
const expect = require('chai').expect
const {
  hash,
  validateUsername,
  hashPasswordMiddleware
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
      const testString = 'username'
      const result = validateUsername(testString)
      expect(result).to.equal(true)
    })

    it('should return false if username is to short', () => {
      const testString = 'u'
      const result = validateUsername(testString)
      expect(result).to.equal(false)
    })

    it('should return false if username is to long', () => {
      const testString = 'usernameIsLongerThanTwentyCharachtars'
      const result = validateUsername(testString)
      expect(result).to.equal(false)
    })

    it('should return false if username is invalid', () => {
      const testString = '()=)(EW'
      const result = validateUsername(testString)
      expect(result).to.equal(false)
    })

    it('should return false if username is has capital letters', () => {
      const testString = 'Username'
      const result = validateUsername(testString)
      expect(result).to.equal(false)
    })

    it('should return false if username is null', () => {
      const testString = null
      const result = validateUsername(testString)
      expect(result).to.equal(false)
    })
  })

  describe('hashPasswordMiddleware()', () => {
    it('should hash password if not modified', done => {
      const origPassword = 'password'

      const getThis = {
        password: origPassword,
        isModified: x => true
      }

      const cb = e => {
        try {
          expect(getThis.password).to.not.equal(origPassword)
          done()
        } catch (error) {
          done(error)
        }
      }

      hashPasswordMiddleware.bind(getThis)(cb)
    })

    it('should not hash password if modified', done => {
      const origPassword = 'password'

      const getThis = {
        password: origPassword,
        isModified: x => false
      }

      const cb = e => {
        try {
          expect(getThis.password).to.equal(origPassword)
          done()
        } catch (error) {
          done(error)
        }
      }

      hashPasswordMiddleware.bind(getThis)(cb)
    })
  })
})
