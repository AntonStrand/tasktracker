/* eslint-disable */
const { describe, it } = require('mocha')
const expect = require('chai').expect
const actions = require('./socketRouter').actions

describe('Socket router', () => {
  describe('actions', () => {
    it('should return a function if the type has a match', () => {
      const result = actions('ws/CREATE_NEW_PROJECT')
      expect(result).to.be.a('function')
    })
    it('should return a function if the type has NO match', () => {
      const result = actions('No match')
      expect(result).to.be.a('function')
    })
  })
})
