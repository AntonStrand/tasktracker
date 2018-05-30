'use strict'

/**
 * Model for Task
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// TASK STATES
const TODO = 'todo'
const IN_PROGRESS = 'in progress'
const DONE = 'done'

const schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'No task was added.']
    },
    description: {
      type: String
    },
    status: {
      type: String,
      required: true,
      default: TODO
    },
    timer: { type: [[Date, Date]] },
    priority: { type: Number, default: 0 },
    deadline: { type: Date },
    assignees: { type: [String] },
    parent: {
      type: { type: String, required: [true, 'Parent type is missing.'] },
      id: {
        type: Schema.Types.ObjectId,
        required: [true, 'Parent id is missing.']
      }
    }
  },
  { timestamps: true }
)

const Task = mongoose.model('Task', schema)

// Test if the updated status is valid
Task.schema.path('status').validate(function (value) {
  return [TODO, IN_PROGRESS, DONE].indexOf(value) !== -1
}, '{VALUE} is not a valid state.')

module.exports = Task

module.exports.taskStates = {
  TODO,
  IN_PROGRESS,
  DONE
}
