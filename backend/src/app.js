'use strict'

/**
 * Entry point for TaskTracker's backend
 * @author Anton Strand
 * @version 1.0
 */

require('dotenv').config()

const app = require('./config/express')(__dirname)
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 8080

// app.use('/', require('./routers/router')(io))

io.on('connection', socket => {
  console.log('Connection!')
})

/*
// 404 if nothing matched.
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

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
