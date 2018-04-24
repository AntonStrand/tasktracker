/**
 * Mongoose model for Project.
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Missing project title.']
    },
    description: { type: String },
    deadline: { type: Date },
    members: {
      type: [String],
      validate: [
        tags => tags.length > 0,
        'A project has to have at least one member.'
      ]
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
  },
  { timestamps: true }
)

module.exports = mongoose.model('Project', schema)
