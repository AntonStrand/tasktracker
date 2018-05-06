const { describe, it } = require('mocha')
const expect = require('chai').expect
const cleanData = require('./index')

describe('cleanData()', () => {
  it('should return an object with "id" and "_doc" should be flatten', () => {
    const testData = {
      _id: '123',
      _doc: {
        title: 'Test title'
      }
    }

    const expectedResult = {
      id: '123',
      title: 'Test title'
    }
    const result = cleanData(testData)
    expect(result).to.be.an('object')
    expect(result).to.deep.equal(expectedResult)
  })

  it('should ignore invalid object key names and return the rest', () => {
    const testData = {
      invalidId: '123',
      title: 'Test title'
    }

    const expectedResult = {
      id: undefined
    }
    const result = cleanData(testData)
    expect(result).to.be.an('object')
    expect(result).to.deep.equal(expectedResult)
  })
  it('should remove _id and __v from _doc', () => {
    const testData = {
      _id: '5aedb00863458669869fa2f9',
      _doc: {
        members: ['username'],
        status: 'On going',
        tasks: [],
        totalTime: 0,
        tags: [],
        _id: '5aedb00863458669869fa2f9',
        title: 'New project',
        description: '',
        deadline: null,
        createdAt: '2018-05-05T13:22:16.604Z',
        updatedAt: '2018-05-05T13:22:16.604Z',
        __v: 0
      },
      _thisShouldBeIgnored: {
        no: 'important',
        value: 'for the view model'
      }
    }

    const expectedResult = {
      members: ['username'],
      status: 'On going',
      tasks: [],
      totalTime: 0,
      tags: [],
      id: '5aedb00863458669869fa2f9',
      title: 'New project',
      description: '',
      deadline: null,
      createdAt: '2018-05-05T13:22:16.604Z',
      updatedAt: '2018-05-05T13:22:16.604Z'
    }

    const result = cleanData(testData)
    expect(result).to.be.an('object')
    expect(result).to.deep.equal(expectedResult)
  })
})
