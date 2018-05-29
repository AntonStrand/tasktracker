// saveProjectToMembers :: UserRepo -> {members::[String], _id::String} -> [Promise User]
const saveProjectToMembers = repository => ({ members, _id }) =>
  members.map(username => repository.addProject(username, _id))

module.exports = saveProjectToMembers
