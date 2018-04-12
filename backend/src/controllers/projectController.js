const { getAuthenticatedUser, isUser } = require('./authentication/')
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

const createMemberList = R.compose(filterAsync(isUser), stringToArray)

const createProjectDoc = formData => async username => ({
  title: formData.title,
  description: formData.description,
  members: await createMemberList(`${formData.members}, ${username}`),
  tags: stringToArray(formData.tags)
})

// create :: repository -> {token, formData} -> [String]
const create = repository => ({ token, formData }) => {
  getAuthenticatedUser(token)
    .then(user => user.fold(console.log, createProjectDoc(formData)))
    .then(console.log)
    .catch(console.log)
}

module.exports = {
  create
}
