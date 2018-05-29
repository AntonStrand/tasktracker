// createProjectDoc :: (String -> Promise [String]) -> Object -> String -> Object
const createProjectDoc = createMemberList => formData => async username => ({
  title: formData.title,
  members: await createMemberList(`${formData.members}, ${username}`)
})

module.exports = createProjectDoc
