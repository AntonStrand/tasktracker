const { describe, it } = require('mocha')
const expect = require('chai').expect
const signUp = require('./../src/controllers/authentication/signUp')

const createRepository = save => ({ save })

describe('signUp()', () => {
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
      send: x => x,
      status: status => {
        try {
          expect(status).to.equal(422)
          done()
        } catch (error) {
          done(error)
        }
      }
    }

    signUp(repository)(req, res)
  })
})
