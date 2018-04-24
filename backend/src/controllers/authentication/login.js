'use strict'

/**
 * Controller for login
 */

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const projectRepo = require('./../../repositories/projectRepository')
const clean = require('./../project/utils').cleanProjectData
const arrayToIndex = require('./../project/utils').arrayToIndex

const createProjectState = (projectRepo, user) =>
  Promise.all(
    user.projects.map(id =>
      projectRepo
        .findById(id)
        .then(clean)
        .catch(() => 'An error occured while fetching this project.')
    )
  )
    .then(arrayToIndex)
    .then(index => ({
      projectsById: index,
      count: Object.keys(index).length
    }))
    .catch(() => 'An error occured while fetching your projects.')

const getUserData = async (projectRepo, user) => ({
  username: user.username,
  assignedTasks: user.assignedTasks,
  projects: await createProjectState(projectRepo, user)
})

// sendToken :: Object -> User -> undefined
const sendUserState = async (res, user) =>
  res.json({
    token: jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    ),
    ...(await getUserData(projectRepo, user))
  })

const onAccessDenied = res => res.json({ error: 'Wrong username or password.' })

/**
 * Try to log in user.
 * @param {Object} repository
 * @param {Object} req
 * @param {Object} res
 */
const login = (repository, compare = bcrypt.compare) => (req, res) =>
  repository
    .findByUsername(req.body.username)
    .then(
      async user =>
        req.body.password && (await compare(req.body.password, user.password))
          ? sendUserState(res, user)
          : onAccessDenied(res)
    )
    .catch(e => onAccessDenied(res))

module.exports = {
  login,
  sendUserState,
  onAccessDenied
}
