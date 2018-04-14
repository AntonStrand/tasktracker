const { maybeGetAuthenticatedUsername, isUser } = require('./authentication/')
const R = require('ramda')
const { filterAsync, isNotNilNorEmpty } = require('./../utils')

// saveProjectToMembers :: UserRepo -> {members::[String], _id::String} -> [User]
const saveProjectToMembers = repository => ({ members, _id }) =>
  members.map(username => repository.addProject(username, _id))

// onlyLowercaseLetters :: String -> String
const onlyLowercaseLetters = R.compose(
  R.replace(/[^a-z]/g, ''),
  R.toLower,
  R.trim
)

// stringToArray :: String -> [String]
const stringToArray = R.compose(
  R.filter(isNotNilNorEmpty),
  R.uniq,
  R.map(onlyLowercaseLetters),
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
const isDateValid = R.compose(deadlineIsInFuture, newDate)

// createDeadline :: String -> Date null
const createDeadline = dateString =>
  isValidDateFormat(dateString) && isDateValid(dateString)
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

// create :: repository -> {token, formData} -> [String]
const create = (repository, userRepo) => ({ token, formData }) =>
  maybeGetAuthenticatedUsername(token)
    .then(maybeUsername =>
      maybeUsername.fold(
        console.log /* user is not authenticated */,
        createProjectDoc(formData)
      )
    )
    .then(repository.create)
    .then(saveProjectToMembers(userRepo))
    .then(console.log)
    .catch(console.log)

module.exports = {
  create
}

// TODO: Respond with errors incase the input is invalid or has to be changed.
// TODO: Should notify the user which users that has been added in case someone was removed.
// TODO: Should return error messages if deadline has passed.
// TODO: Should return error messages if user can't be authenticated.
