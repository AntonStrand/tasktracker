const { maybeGetAuthenticatedUsername } = require('./../authentication/')
const { createProjectDoc, saveProjectToMembers } = require('./utils')

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
