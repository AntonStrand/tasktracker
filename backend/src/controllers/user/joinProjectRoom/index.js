const safeTokenToId = require('./../utils').safeTokenToId
const gCPDep = require('./../../project/generateState/getCleanedProjects')

// joinProjectRoom :: UserRepo, ProjectRepo, (a -> a -> Promise [Project]) -> socket, String -> undefined
module.exports = (userRepo, projectRepo, getCleanedProjects = gCPDep) => (
  socket,
  token
) =>
  safeTokenToId(token).map(id =>
    userRepo
      .findById(id)
      .then(getCleanedProjects(projectRepo))
      .then(projects => projects.map(project => socket.join(project.id)))
  )
