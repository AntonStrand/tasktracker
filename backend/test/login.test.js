const { describe, it } = require('mocha')
const expect = require('chai').expect
const {
  login,
  sendToken,
  onAccessDenied
} = require('./../src/controllers/authentication/login')

const createRepository = findUserByName => ({ findUserByName })

process.env.JWT_KEY = 'testKey'

const allowAccess = () => Promise.resolve(true)
const denyAccess = () => Promise.resolve(false)

describe('Login', () => {
  describe('login()', () => {
    const req = {
      body: {
        username: 'username',
        password: 'Password'
      }
    }

    it('Should call repository.login()', done => {
      try {
        let isCalled = false

        const repository = createRepository(() => {
          isCalled = true
          return Promise.resolve({
            username: 'username',
            password: 'Password',
            _id: '1234'
          })
        })

        const res = {
          status: status => ({ send: x => x })
        }

        login(repository, allowAccess)(req, res)
        expect(isCalled).to.equal(true)
        done()
      } catch (error) {
        done(error)
      }
    })

    it('Should send an object via res.json', done => {
      try {
        const repository = createRepository(() =>
          Promise.resolve({
            username: 'username',
            password: 'Password',
            _id: '1234'
          })
        )
        const res = {
          status: status => ({ send: x => x }),
          json: result => {
            try {
              expect(typeof result).to.equal('object')
              done()
            } catch (error) {
              done(error)
            }
            return { send: x => x }
          }
        }
        login(repository, allowAccess)(req, res)
      } catch (error) {
        done(error)
      }
    })

    it('Should send 401 if access denied', done => {
      const repository = createRepository(() =>
        Promise.resolve({
          username: 'username',
          password: 'Password',
          _id: '1234'
        })
      )
      const res = {
        status: status => {
          try {
            expect(status).to.equal(401)
            done()
          } catch (error) {
            done(error)
          }
          return { send: x => x }
        }
      }
      login(repository, denyAccess)(req, res)
    })

    it('Should send 401 if user was not found', done => {
      const repository = createRepository(() =>
        Promise.reject(new Error('User not found'))
      )
      const res = {
        status: status => {
          try {
            expect(status).to.equal(401)
            done()
          } catch (error) {
            done(error)
          }
          return { send: x => x }
        }
      }
      login(repository, denyAccess)(req, res)
    })

    it('Should send 401 if the password in the request is missing', done => {
      const req = {
        body: {
          username: 'username'
        }
      }
      const repository = createRepository(() =>
        Promise.resolve({
          username: 'username',
          password: 'Password',
          _id: '1234'
        })
      )
      const res = {
        status: status => {
          try {
            expect(status).to.equal(401)
            done()
          } catch (error) {
            done(error)
          }
          return { send: x => x }
        }
      }
      login(repository, (p1, p2) => Promise.resolve(p1 === p2))(req, res)
    })
  })

  describe('sendToken()', () => {
    it('Should call json() with an object', () => {
      const res = {
        json: result => {
          expect(typeof result).to.equal('object')
        }
      }
      const user = {
        username: 'username',
        _id: '1234'
      }
      sendToken(res, user)
    })
  })
  describe('onAccessDenied()', () => {
    it('Should responed with a status 401 and "Access denied."', () => {
      const res = {
        status: status => {
          expect(status).to.equal(401)
          return { send: x => expect(x).to.equal('Access denied.') }
        }
      }
      onAccessDenied(res)
    })
  })
})
