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

    it('Should call repository.save()', done => {
      try {
        let isCalled = false

        const repository = createRepository(user => {
          isCalled = true
          return Promise.resolve({ username: 'Username' })
        })

        const res = {
          send: x => x,
          status: status => status
        }

        signUp(repository)(req, res)
        expect(isCalled).to.equal(true)
        done()
      } catch (error) {
        done(error)
      }
    })

    it('Should send status to 200 if successful', done => {
      try {
        const repository = createRepository(user => Promise.resolve({}))
        const res = {
          send: x => x,
          status: status => {
            expect(status).to.equal(200)
            done()
          }
        }
        signUp(repository)(req, res)
      } catch (error) {
        done(error)
      }
    })

    it('Should send message in Array if successful', done => {
      try {
        const repository = createRepository(user => Promise.resolve({}))
        const res = {
          send: x => {
            expect(Array.isArray(x)).to.equal(true)
            expect(typeof x[0]).to.equal('string')
            done()
          },
          status: status => status
        }
        signUp(repository)(req, res)
      } catch (error) {
        done(error)
      }
    })

    // it('Should send status to 422 if invalid input', done => {
    //   try {
    //     const repository = createRepository(() =>
    //       Promise.reject(new Error('username: invalid'))
    //     )

    //     const res = {
    //       send: x => x,
    //       status: status => {
    //         expect(status).to.equal(422)
    //         done()
    //       }
    //     }

    //     signUp(repository)(req, res)
    //   } catch (error) {
    //     done(error)
    //   }
    // })
  })
})
