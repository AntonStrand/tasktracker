const Project = require('./../models/Project')

// create :: doc -> Promise Project
const create = doc => Promise.resolve(doc).then(doc => new Project(doc).save())

// findById :: id -> Promise Project
const findById = _id => Project.findOne({ _id }).exec()

// addTaskId :: String -> String -> Promise Project
const addTaskId = (projectId, taskId) =>
  Project.update({ _id: projectId }, { $push: { tasks: taskId } }).exec()

// Used for testing.
const findAll = () => Project.find({}).exec()

module.exports = {
  create,
  findById,
  addTaskId,
  findAll
}
