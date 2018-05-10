const { describe, it } = require('mocha')
const expect = require('chai').expect
const joinProjectRoom = require('./index')

describe('joinProjectRoom()', () => {
  const projectRepo = {}
  const userRepo = {
    findById: () => Promise.resolve({})
  }

  const getCleanedProjects = repo => () =>
    Promise.resolve([
      { id: '123', title: 'title' },
      { id: '456', title: 'title2' }
    ])

  it('should join all projects rooms', done => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWQiOiI1YWVjMjgxMjc2YWFiZTUyMGExNjA0NjgiLCJpYXQiOjE1MjU4NTk3MDEsImV4cCI6MTUyNTg2MzMwMX0.X7BDvU5c9Ja8-BJHtZXWCV8kox3a4quvPMtHizbCNoc'

    let result = []
    joinProjectRoom(userRepo, projectRepo, getCleanedProjects)(
      {
        join: id => {
          result.push(id)
        }
      },
      token
    )
    setTimeout(() => {
      expect(result.length).to.equal(2)
      expect(result).to.deep.equal(['123', '456'])
      done()
    }, 20)
  })

  it('should not join if token is invalid', done => {
    const token = ''
    let result = []
    joinProjectRoom(userRepo, projectRepo)(
      {
        join: id => {
          result.push(id)
        }
      },
      token
    )
    setTimeout(() => {
      expect(result.length).to.equal(0)
      expect(result).to.deep.equal([])
      done()
    }, 20)
  })
})
