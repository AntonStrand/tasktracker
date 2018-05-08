'use strict'

const mongoose = require('mongoose')
const setupTestEnv = require('./setupTestEnv')

// onConnection :: Event -> String -> Undefined
const onConnection = (event, msg) =>
  mongoose.connection.on(event, e => console.log(msg, !e ? '' : e))

const isEnv = type => process.env.NODE_ENV === type

const fetchUrl = () =>
  isEnv('test') ? process.env.DB_TEST_URL : process.env.DB_URL

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

  const URL = fetchUrl()
  if (isEnv('test')) setupTestEnv()

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
