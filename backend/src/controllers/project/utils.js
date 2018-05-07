const R = require('ramda')
const { filterAsync, isNotNilNorEmpty } = require('./../../utils')
const { isUser } = require('./../authentication/socketAuth')

// executeAndReturnArgument :: (a -> a) -> a -> a
const executeAndReturnArgument = R.curry((fn, x) => {
  fn(x)
  return x
})

// saveProjectToMembers :: UserRepo -> {members::[String], _id::String} -> [Promise User]
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

// createMemberList :: String -> (Promise [String])
const createMemberList = R.compose(filterAsync(isUser), stringToArray)

// validateDateFormat :: String -> Boolean
const isValidDateFormat = R.test(
  // YYYY-MM-DD :: http://regexlib.com/REDetails.aspx?regexp_id=933
  /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/
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

// arrayToIndex :: [{ id:String, ...a }] -> { id:{a} }
const arrayToIndex = xs =>
  xs.reduce((index, x) => ({ ...index, [x.id]: x }), {})

module.exports = {
  executeAndReturnArgument,
  saveProjectToMembers,
  onlyLowercaseLettersAndNumbers,
  stringToArray,
  createMemberList,
  isValidDateFormat,
  deadlineIsInFuture,
  newDate,
  isValidDate,
  createDeadline,
  createProjectDoc,
  arrayToIndex
}
