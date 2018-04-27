const { describe, it } = require('mocha')
const expect = require('chai').expect
const {
  login,
  onAccessDenied
} = require('./../src/controllers/authentication/login')

const createRepository = findByUsername => ({ findByUsername })

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
          json: x => x
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

    it('Should send JSON if access denied', done => {
      const repository = createRepository(() =>
        Promise.resolve({
          username: 'username',
          password: 'Password',
          _id: '1234'
        })
      )
      const res = {
        json: msg => {
          try {
            expect(typeof msg).to.equal('object')
            done()
          } catch (error) {
            done(error)
          }
          return { json: x => x }
        }
      }
      login(repository, denyAccess)(req, res)
    })

    it('Should send JSON if user was not found', done => {
      const repository = createRepository(() =>
        Promise.reject(new Error('User not found'))
      )
      const res = {
        json: msg => {
          try {
            expect(typeof msg).to.equal('object')
            done()
          } catch (error) {
            done(error)
          }
          return { json: x => x }
        }
      }
      login(repository, denyAccess)(req, res)
    })

    it('Should send JSON if the password in the request is missing', done => {
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
        json: msg => {
          try {
            expect(typeof msg).to.equal('object')
            done()
          } catch (error) {
            done(error)
          }
          return { json: x => x }
        }
      }
      login(repository, (p1, p2) => Promise.resolve(p1 === p2))(req, res)
    })
  })

  describe('onAccessDenied()', () => {
    it('Should responed with a JSON and "Wrong username or password."', () => {
      const res = {
        json: ({ error }) => {
          expect(error).to.equal('Wrong username or password.')
        }
      }
      onAccessDenied(res)
    })
  })
})
