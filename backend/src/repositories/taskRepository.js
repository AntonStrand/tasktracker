const Task = require('./../models/Task')

// create :: doc -> Promise Task
const create = doc => new Task(doc).save()

// findById :: id -> Promise Task
const findById = _id => Task.findOne({ _id }).exec()

const findAll = () => Task.find({}).exec()

module.exports = {
  create,
  findById,
  findAll
}
