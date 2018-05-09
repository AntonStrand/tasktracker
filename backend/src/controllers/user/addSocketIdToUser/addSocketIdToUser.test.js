/* eslint-disable */
const { describe, it } = require('mocha')
const expect = require('chai').expect
const addSocketIdToUser = require('./index')

describe('addSocketIdToUser', () => {
  it('should call userRepo.addSocketId if the token is valid', () => {
    const socket = { id: 'UDoClxi3iSVFmGXtAAAA' }
    const payload = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF3ZSIsImlkIjoiNWFjNGRlM2JlMjNhODYzMDk0ZDQ5ZDAyIiwiaWF0IjoxNTIzNzgwMjcwLCJleHAiOjE1MjM3ODM4NzB9.CSfmsRbssYAZ0XaK7_39or1ZGculLznpyVBR9FIYi4Y'
    }
    const userRepo = {
      addSocketId: socketId => _id => {
        expect(socketId).to.equal(socket.id)
        expect(_id).to.equal('5ac4de3be23a863094d49d02')
      }
    }
    addSocketIdToUser(userRepo)(socket, payload)
  })
  it('should not call userRepo.addSocketId if the token is invalid', () => {
    const socket = { id: 'UDoClxi3iSVFmGXtAAAA' }
    const payload = {
      token: 'invalid'
    }

    let isExecuted = false
    const userRepo = { addSocketId: socketId => _id => (isExecuted = true) }
    addSocketIdToUser(userRepo)(socket, payload)
    expect(isExecuted).to.be.false
  })
})
