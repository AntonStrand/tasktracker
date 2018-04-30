'use strict'

/**
 * Model for Task
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
      default: 'Todo'
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
