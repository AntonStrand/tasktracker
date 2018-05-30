// joinProjectRoom :: UserRepo, ProjectRepo, (a -> a -> Promise [Project]) -> socket, String -> undefined
module.exports = (userRepo, projectRepo, getCleanedProjects) => (socket, id) =>
  userRepo
    .findById(id)
    .then(getCleanedProjects(projectRepo))
    .then(projects => projects.map(project => socket.join(project.id)))
