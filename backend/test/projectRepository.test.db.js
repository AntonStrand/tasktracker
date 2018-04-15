const { describe, it, beforeEach } = require('mocha')
const expect = require('chai').expect
const projectRepository = require('./../src/repositories/projectRepository')
const db = require('./../src/models/User')
require('./../src/app')

describe('Project repository', () => {
  // Setup
  beforeEach(done => {
    // Empty db
    db.remove({}, done)
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

  describe('findById()', () => {
    it('should find a project based on a valid id', done => {
      const projectData = { title: 'Project', members: ['user'] }
      projectRepository
        .create(projectData)
        .then(({ _id }) => {
          projectRepository.findById(_id).then(project => {
            expect(project.title).to.equal(projectData.title)
            done()
          })
        })
        .catch(done)
    })

    it('should throw an error if id is invalid', done => {
      projectRepository
        .findById('invalid-id')
        .then(done)
        .catch(err => {
          expect(err.value).to.equal('invalid-id')
          done()
        })
    })
  })
})
