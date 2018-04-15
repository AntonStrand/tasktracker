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

  describe('maybeGetAuthenticatedUsername()', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF3ZSIsImlkIjoiNWFjNGRlM2JlMjNhODYzMDk0ZDQ5ZDAyIiwiaWF0IjoxNTIzNzgwMjcwLCJleHAiOjE1MjM3ODM4NzB9.CSfmsRbssYAZ0XaK7_39or1ZGculLznpyVBR9FIYi4Y'

    const createRepository = findById => ({ findById })

    it('should return Just username if the user is authenticated', done => {
      const repo = createRepository(() =>
        Promise.resolve({ username: 'username' })
      )
      maybeGetAuthenticatedUsername(repo)(token)
        .then(actual => {
          expect(actual.unsafeGet()).to.equal('username')
          done()
        })
        .catch(done)
    })

    it('should return Nothing if the user is NOT authenticated', done => {
      const repo = createRepository(() => Promise.resolve())
      maybeGetAuthenticatedUsername(repo)(token)
        .then(actual => {
          const result = actual.getOrElse('Not authenicated')
          expect(result).to.equal('Not authenicated')
          done()
        })
        .catch(done)
    })

    it('should return Nothing if the authentication throws an error', done => {
      const repo = createRepository(() => Promise.reject(new Error()))
      maybeGetAuthenticatedUsername(repo)(token)
        .then(actual => {
          const result = actual.getOrElse('Not authenicated')
          expect(result).to.equal('Not authenicated')
          done()
        })
        .catch(done)
    })
  })
})
