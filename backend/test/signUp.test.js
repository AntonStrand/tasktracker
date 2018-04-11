const { describe, it } = require('mocha')
const expect = require('chai').expect
const {
  signUp,
  isErrorKey,
  getMessages
} = require('./../src/controllers/authentication/signUp')

const createRepository = save => ({ save })

describe('Sign up', () => {
  describe('signUp()', () => {
    const req = {
      body: {
        username: 'username',
        password: 'Password'
      }
    }

    it('Should call repository.save()', done => {
      try {
        let isCalled = false

        const repository = createRepository(user => {
          isCalled = true
          return Promise.resolve({ username: 'username' })
        })

        const res = {
          status: status => ({ send: x => x })
        }

        signUp(repository)(req, res)
        expect(isCalled).to.equal(true)
        done()
      } catch (error) {
        done(error)
      }
    })

    it('Should send status to 200 if successful', done => {
      const repository = createRepository(user => Promise.resolve({}))
      const res = {
        status: status => {
          try {
            expect(status).to.equal(200)
            done()
          } catch (error) {
            done(error)
          }
          return { send: x => x }
        }
      }
      signUp(repository)(req, res)
    })

    it('Should send message in Array if successful', done => {
      const repository = createRepository(user => Promise.resolve({}))
      const res = {
        status: status => ({
          send: x => {
            try {
              expect(Array.isArray(x)).to.equal(true)
              expect(typeof x[0]).to.equal('string')
              done()
            } catch (error) {
              done(error)
            }
          }
        })
      }
      signUp(repository)(req, res)
    })

    it('Should send status to 422 if invalid input', done => {
      const repository = createRepository(() =>
        Promise.reject(new Error('error'))
      )

      const res = {
        status: status => {
          try {
            expect(status).to.equal(422)
            done()
          } catch (error) {
            done(error)
          }
          return { send: x => x }
        }
      }

      signUp(repository)(req, res)
    })
  })
  describe('isErrorKey()', () => {
    it('should return true if key is "username"', () => {
      const result = isErrorKey('username')
      expect(result).to.equal(true)
    })
    it('should return true if key is "password"', () => {
      const result = isErrorKey('password')
      expect(result).to.equal(true)
    })
    it('should return false if key is "error"', () => {
      const result = isErrorKey('error')
      expect(result).to.equal(false)
    })
  })

  describe('getMessages()', () => {
    const error = {
      name: 'ValidationError',
      errors: {
        username: {
          message: 'Invalid username.'
        },
        password: {
          message: 'Invalid password.'
        }
      }
    }
    it('should return "Invalid username." as first item', () => {
      const result = getMessages(error)
      expect(result[0]).to.equal('Invalid username.')
    })
    it('should return "Invalid password." as second item', () => {
      const result = getMessages(error)
      expect(result[1]).to.equal('Invalid password.')
    })
  })
})
