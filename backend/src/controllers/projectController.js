const { maybeGetAuthenticatedUsername, isUser } = require('./authentication/')
const R = require('ramda')
const { filterAsync, isNotNilNorEmpty } = require('./../utils')

const onlyLowercaseLetters = R.compose(
  R.replace(/[^a-z]/g, ''),
  R.toLower,
  R.trim
)

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

// TODO: Should return error msg
// createDeadline :: String -> Date null
const createDeadline = dateString =>
  isValidDateFormat(dateString) && isDateValid(dateString)
    ? newDate(dateString)
    : null

const createProjectDoc = formData => async username => ({
  title: formData.title,
  description: formData.description,
  deadline: createDeadline(formData.deadline),
  members: await createMemberList(`${formData.members}, ${username}`),
  tags: stringToArray(formData.tags)
})

// create :: repository -> {token, formData} -> [String]
const create = repository => ({ token, formData }) =>
  maybeGetAuthenticatedUsername(token)
    .then(maybeUsername =>
      maybeUsername.fold(
        console.log /* user is not authenticated */,
        createProjectDoc(formData)
      )
    )
    .then(console.log)
    .catch(console.log)

module.exports = {
  create
}

// TODO: Respond with errors incase the input is invalid or has to be changed.
