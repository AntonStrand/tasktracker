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

const validateState = state => [TODO, IN_PROGRESS, DONE].indexOf(state) !== -1

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
      default: TODO,
      validate: [validateState, '{VALUE} is not a valid state.']
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

module.exports = mongoose.model('Task', schema)

module.exports.taskStates = {
  TODO,
  IN_PROGRESS,
  DONE
}
