const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const session = require('express-session')

module.exports = () => {
  const app = express()

  // Using helmet for setting headers to improve security.
  app.use(helmet())

  // Set CSP. This is not included in helmet().
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'", 'fonts.googleapis.com', 'fonts.gstatic.com']
      }
    })
  )

  // Parse body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Set session options.
  const sessionOptions = {
    name: 'session',
    secret: 'fghufoisyrgvhe8gy3wun::jgskafeigjso3267548923',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  }

  // Set cookie to secure when in production.
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sessionOptions.cookie.secure = true // serve secure cookies
  }

  app.use(session(sessionOptions))

  return app
}
