const compose = require('ramda/src/compose')
const { filterAsync } = require('./../../../../utils')
const stringToArray = require('./../stringToArray')

// createMemberList :: (String -> Promise Boolean) -> String -> Promise [String]
const createMemberList = isUser => compose(filterAsync(isUser), stringToArray)

module.exports = createMemberList
