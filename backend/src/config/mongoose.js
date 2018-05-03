'use strict'

const mongoose = require('mongoose')

// onConnection :: Event -> String -> Undefined
const onConnection = (event, msg) =>
  mongoose.connection.on(event, e => console.log(msg, !e ? '' : e))

/**
 * Establish a mongoDB connection
 * @return {Promise}
 */
module.exports.run = () => {
  mongoose.Promise = global.Promise

  // Connection events.
  onConnection('error', 'Mongoose connection error:')
  onConnection('connected', 'Mongoose connection is open.')
  onConnection('disconnected', 'Mongoose connection is disconnected.')

  const URL =
    process.env.NODE_ENV === 'test'
      ? process.env.DB_TEST_URL
      : process.env.DB_URL

  // Close the connection in case the app is terminated.
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to application termination.'
      )
      process.exit(0)
    })
  })
  return mongoose.connect(URL)
}
