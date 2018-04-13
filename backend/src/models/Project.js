/**
 * Mongoose model for Project.
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  title: {
    type: String,
    required: [true, 'Missing project title']
  },
  description: { type: String },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: { type: Date },
  deadline: { type: Date },
  members: {
    type: [String],
    required: [true, 'A project has to have at least one member']
  },
  status: {
    type: String,
    required: true,
    default: 'On going'
  },
  tasks: {
    type: [Schema.Types.ObjectId]
  },
  totalTime: { type: Number, default: 0 },
  tags: { type: [String] }
})

module.exports = mongoose.model('Project', schema)
