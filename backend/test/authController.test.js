const { describe, it } = require('mocha')
const expect = require('chai').expect
const authController = require('./../src/controllers/authController')

const createRepository = save => ({ save })

describe('Auth controller', () => {
  describe('signUp()', () => {
    const signUp = authController.signUp

    const req = {
      body: {
        username: 'Username',
        password: 'Password'
      }
    }

    it('Should call repository.save()', () => {
      let isCalled = false

      const repository = createRepository(user => {
        isCalled = true
        return Promise.resolve({})
      })

      const res = {
        send: x => x,
        status: status => status
      }

      signUp(repository)(req, res)
      expect(isCalled).to.equal(true)
    })

    it('Should send status to 200 if successful', done => {
      const repository = createRepository(user => Promise.resolve({}))
      const res = {
        send: x => x,
        status: status => {
          expect(status).to.equal(200)
          done()
        }
      }

      signUp(repository)(req, res)
    })

    it('Should send status to 422 if invalid input', done => {
      const repository = createRepository(() => Promise.reject(new Error()))

      const res = {
        send: x => x,
        status: status => {
          expect(status).to.equal(422)
          done()
        }
      }

      signUp(repository)(req, res)
    })

    it('Should send error message if invalid input', done => {
      const errorMessage = 'Invalid input'
      const repository = createRepository(() =>
        Promise.reject(new Error(errorMessage))
      )

      const res = {
        send: x => {
          expect(typeof x).to.equal('string')
          expect(x).to.equal(errorMessage)
          done()
        },
        status: status => status
      }

      signUp(repository)(req, res)
    })
  })
})
