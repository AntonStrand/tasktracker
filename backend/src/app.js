'use strict'

/**
 * Entry point for TaskTracker's backend
 * @author Anton Strand
 * @version 1.0
 */

require('dotenv').config()

const mongoose = require('./config/mongoose')
const app = require('./config/express')(__dirname)
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 8080

// Crash the application in case the mongoose connection doesn't work.
mongoose.run().catch(() => process.exit(1))

// Handle API routes
app.use('/api', require('./routes/authRouter'))

// Handle Socket routes
require('./routes/socketRouter')(io)

/*
// Error handler.
app.use((err, req, res, next) => {
  err.status === 404
    ? res.status(404).sendFile(path.join(__dirname, '/views/errors/404.html'))
    : res.status(500).sendFile(path.join(__dirname, '/views/errors/500.html'))
})
*/
http.listen(PORT, () => {
  console.log(`Express app is listening on port: ${PORT}.`)
  console.log(`Press ctrl+c to terminate...`)
})
