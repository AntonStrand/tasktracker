const R = require('ramda')

// onlyLowercaseLettersAndNumbers :: String -> String
const onlyLowercaseLettersAndNumbers = R.compose(
  R.replace(/[^a-z0-9]/g, ''),
  R.toLower,
  R.trim
)

module.exports = onlyLowercaseLettersAndNumbers
