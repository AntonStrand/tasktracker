const { describe, it } = require('mocha')
const expect = require('chai').expect

const createProjectDoc = require('./createProjectDoc')

describe('createProjectDoc()', () => {
  it('should format the argument as a project doc', async () => {
    const title = 'project title'
    const members = 'paul, john'
    const formData = { title, members }
    const expectedMembers = ['paul', 'john']
    const expectedresult = { title, members: expectedMembers }
    const createMemberList = _ => Promise.resolve(expectedMembers)
    const result = await createProjectDoc(createMemberList)(formData)(
      'username'
    )
    expect(result).to.deep.equal(expectedresult)
  })
})
