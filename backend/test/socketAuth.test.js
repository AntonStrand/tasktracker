const { describe, it } = require('mocha')
const expect = require('chai').expect
const {
  maybeGetAuthenticatedUsername,
  isUser
} = require('./../src/controllers/authentication/socketAuth')

describe('Socket Auth', () => {
  describe('isUser()', () => {
    const createRepository = fn => ({
      findByUsername: fn
    })

    const expectToEqual = (ex, done) => res => {
      expect(res).to.equal(ex)
      done()
    }

    it('should return true if user is found', done => {
      const repo = createRepository(() => Promise.resolve({ user: 'yay' }))
      isUser(repo)('')
        .then(expectToEqual(true, done))
        .catch(done)
    })

    it('should return false if error', done => {
      const repo = createRepository(() => Promise.reject(new Error()))
      isUser(repo)('')
        .then(expectToEqual(false, done))
        .catch(done)
    })

    it('should return false if user is not found', done => {
      const repo = createRepository(() => Promise.resolve())
      isUser(repo)('')
        .then(expectToEqual(false, done))
        .catch(done)
    })
  })
})
