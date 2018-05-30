const { describe, it } = require('mocha')
const expect = require('chai').expect
const authenticateByToken = require('./authenticateByToken')

describe('authenticateByToken()', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF3ZSIsImlkIjoiNWFjNGRlM2JlMjNhODYzMDk0ZDQ5ZDAyIiwiaWF0IjoxNTIzNzgwMjcwLCJleHAiOjE1MjM3ODM4NzB9.CSfmsRbssYAZ0XaK7_39or1ZGculLznpyVBR9FIYi4Y'

  const createRepository = findById => ({ findById })

  it('should return Just username if the user is authenticated', done => {
    const repo = createRepository(() =>
      Promise.resolve({ username: 'username' })
    )
    authenticateByToken(repo)(token)
      .then(actual => {
        expect(actual.unsafeGet()).to.deep.equal({ username: 'username' })
        done()
      })
      .catch(done)
  })

  it('should return Nothing if the user is NOT authenticated', done => {
    const repo = createRepository(() => Promise.resolve())
    authenticateByToken(repo)(token)
      .then(actual => {
        const result = actual.getOrElse('Not authenicated')
        expect(result).to.equal('Not authenicated')
        done()
      })
      .catch(done)
  })

  it('should return Nothing if the authentication throws an error', done => {
    const repo = createRepository(() => Promise.reject(new Error()))
    authenticateByToken(repo)(token)
      .then(actual => {
        const result = actual.getOrElse('Not authenicated')
        expect(result).to.equal('Not authenicated')
        done()
      })
      .catch(done)
  })

  it('should return Nothing if the token is invalid', done => {
    const repo = createRepository(() => Promise.reject(new Error()))
    authenticateByToken(repo)('invalid token')
      .then(actual => {
        const result = actual.getOrElse('Not authenicated')
        expect(result).to.equal('Not authenicated')
        done()
      })
      .catch(done)
  })
})
