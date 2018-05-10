/* eslint-disable */
const { describe, it } = require('mocha')
const expect = require('chai').expect
const safeTokenToId = require('./index').safeTokenToId

describe('User controller utils', () => {
  describe('safeTokenToId()', () => {
    it('should return Just String (userId) if the token is valid', () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWQiOiI1YWVjMjgxMjc2YWFiZTUyMGExNjA0NjgiLCJpYXQiOjE1MjU4NTk3MDEsImV4cCI6MTUyNTg2MzMwMX0.X7BDvU5c9Ja8-BJHtZXWCV8kox3a4quvPMtHizbCNoc'
      const result = safeTokenToId(token)
      expect(result.unsafeGet()).to.equal('5aec281276aabe520a160468')
    })
    it('should return Nothing if the token is invalid', () => {
      const token = ''
      const result = safeTokenToId(token)
      expect(result.getOrElse(null)).to.be.null
    })
  })
})
