const R = require('ramda')
const { filterAsync, isNotNilNorEmpty } = require('./../../utils')
const { isUser } = require('./../authentication/')

// saveProjectToMembers :: UserRepo -> {members::[String], _id::String} -> [User]
const saveProjectToMembers = repository => ({ members, _id }) =>
  members.map(username => repository.addProject(username, _id))

// onlyLowercaseLettersAndNumbers :: String -> String
const onlyLowercaseLettersAndNumbers = R.compose(
  R.replace(/[^a-z0-9]/g, ''),
  R.toLower,
  R.trim
)

// stringToArray :: String -> [String]
const stringToArray = R.compose(
  R.filter(isNotNilNorEmpty),
  R.uniq,
  R.map(onlyLowercaseLettersAndNumbers),
  R.split(',')
)

// createMemberList :: String -> [String]
const createMemberList = R.compose(filterAsync(isUser), stringToArray)

// validateDateFormat :: String -> Boolean
const isValidDateFormat = R.test(
  // YYYY-MM-DD
  /(\d{4})-(\d{2})-(\d{2})/
)

// deadlineIsInFuture :: Date -> Boolean
const deadlineIsInFuture = date => date >= new Date()

// newDate :: String -> Date
const newDate = x => new Date(x)

// isDateValid :: String -> Boolean
const isValidDate = R.compose(deadlineIsInFuture, newDate)

// createDeadline :: String -> Date null
const createDeadline = dateString =>
  isValidDateFormat(dateString) && isValidDate(dateString)
    ? newDate(dateString)
    : null

// createProjectDoc :: Object -> String -> Object
const createProjectDoc = formData => async username => ({
  title: formData.title,
  description: formData.description,
  deadline: createDeadline(formData.deadline),
  members: await createMemberList(`${formData.members}, ${username}`),
  tags: stringToArray(formData.tags)
})

module.exports = {
  saveProjectToMembers,
  onlyLowercaseLettersAndNumbers,
  stringToArray,
  createMemberList,
  isValidDateFormat,
  deadlineIsInFuture,
  newDate,
  isValidDate,
  createDeadline,
  createProjectDoc
}
