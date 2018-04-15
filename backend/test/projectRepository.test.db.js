const { describe, it, after, before } = require('mocha')
const expect = require('chai').expect
const projectRepository = require('./../src/repositories/projectRepository')
const db = require('./../src/models/User')
require('./../src/app')

describe('Project repository', () => {
  // Setup
  before(done => {
    // Empty db
    db.remove({}, done)
  })

  // Teardown
  after(() => {
    process.exit()
  })

  describe('create()', () => {
    it('should save a project', done => {
      const projectData = { title: 'Project', members: ['user'] }
      projectRepository
        .create(projectData)
        .then(project => {
          expect(project.title).to.equal(projectData.title)
          done()
        })
        .catch(done)
    })
    it('should throw an error if title is missing', done => {
      const projectData = { members: ['user'] }
      projectRepository
        .create(projectData)
        .then(done)
        .catch(({ errors }) => {
          expect(errors.title.message).to.equal('Missing project title.')
          done()
        })
    })

    it('should throw an error if members are missing', done => {
      const projectData = { title: 'Project' }
      projectRepository
        .create(projectData)
        .then(done)
        .catch(error => {
          expect(error.errors.members.message).to.equal(
            'A project has to have at least one member.'
          )
          done()
        })
    })
  })
})
