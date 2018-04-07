'use strict'

/**
 * Entry point for TaskTracker's backend
 * @author Anton Strand
 * @version 1.0
 */

require('dotenv').config()

const mongoose = require('./config/mongoose')
const app = require('./config/express')(__dirname)
const path = require('path')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 8080

// app.use('/', require('./routers/router')(io))

// Crash the application in case the mongoose connection doesn't work.
mongoose.run().catch(() => process.exit(1))

io.on('connection', socket => {
  console.log('Connection!')
})

console.log('__dirname:', __dirname)

app.get('/*', function (req, res) {
  console.log('Sending file')
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'))
})

app.use('/api', require('./routes/authRouter'))

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
