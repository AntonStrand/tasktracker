const Task = require('./../models/Task')

// create :: doc -> Promise Task
const create = doc => new Task(doc).save()

// findById :: id -> Promise Task
const findById = _id => Task.findOne({ _id }).exec()

const findAll = () => Task.find({}).exec()

// changeStatus :: id -> String -> Promise Task
const changeStatus = _id => status =>
  Task.update({ _id }, { status })
    .exec()
    .then(_ => findById(_id))

// changePriority :: id -> Number -> Promise Task
const changePriority = (_id, priority) =>
  Task.update({ _id }, { priority })
    .exec()
    .then(_ => findById(_id))

module.exports = {
  create,
  findById,
  findAll,
  changeStatus,
  changePriority
}
