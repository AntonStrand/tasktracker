const { describe, it, beforeEach } = require('mocha')
const expect = require('chai').expect
const getCleanedProject = require('./index')

describe('getCleanedProject()', () => {
  const projectRepo = {}
  const user = {
    projects: ['123', '456', '789']
  }

  beforeEach(function () {
    projectRepo.findById = id =>
      Promise.resolve({ _id: id, _doc: { title: id } })
  })

  it('should return a promise of an array of cleaned Projects', done => {
    const expectedResult = [
      { id: '123', title: '123' },
      { id: '456', title: '456' },
      { id: '789', title: '789' }
    ]

    getCleanedProject(projectRepo, user)
      .then(result => {
        expect(result).to.deep.equal(expectedResult)
        done()
      })
      .catch(done)
  })

  it('should remove rejected Projects from the Array', done => {
    const expectedResult = []

    projectRepo.findById = id => Promise.reject(Error('Was not found.'))

    getCleanedProject(projectRepo, user)
      .then(result => {
        expect(result).to.deep.equal(expectedResult)
        done()
      })
      .catch(done)
  })
})
