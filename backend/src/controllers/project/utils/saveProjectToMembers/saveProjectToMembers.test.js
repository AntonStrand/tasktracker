const { describe, it } = require('mocha')
const expect = require('chai').expect

const saveProjectToMembers = require('./saveProjectToMembers')

describe('saveProjectToMembers()', () => {
  it('should call addProject with the project id and username of each member', done => {
    const _id = '123'
    const members = ['user1', 'user2', 'user3']
    const result = []
    const repository = {
      addProject: (username, id) => {
        result.push({ username, id })

        if (result.length === members.length) {
          result.forEach(({ username, id }, i) => {
            expect(username).to.equal(members[i])
            expect(id).to.equal(_id)
          })
          done()
        }
      }
    }
    saveProjectToMembers(repository)({ members, _id })
  })
})
