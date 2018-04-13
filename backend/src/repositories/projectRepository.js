const Project = require('./../models/Project')

// create :: doc -> Promise Project
const create = doc => new Project(doc).save()

// findById :: id -> Promise Project
const findById = _id => Project.findOne({ _id }).exec()

const findAll = () => Project.find({}).exec()

// update :: doc -> Promise Project
// TODO: Add updatedAt automatic.

module.exports = {
  create,
  findById,
  findAll
}
