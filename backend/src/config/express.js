const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path')

module.exports = baseURL => {
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

  app.use(express.static(path.join(baseURL, 'frontend/build')))

  return app
}
