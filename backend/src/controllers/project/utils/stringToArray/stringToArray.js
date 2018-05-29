const R = require('ramda')
const { isNotNilNorEmpty } = require('./../../../../utils')
const onlyLowercaseLettersAndNumbers = require('./../onlyLowercaseLettersAndNumbers')

// stringToArray :: String -> [String]
const stringToArray = R.compose(
  R.filter(isNotNilNorEmpty),
  R.uniq,
  R.map(onlyLowercaseLettersAndNumbers),
  R.split(',')
)

module.exports = stringToArray
