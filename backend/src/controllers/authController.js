'use strict'

const signUp = repository => (req, res, next) => {
  console.log('Sign up', req.body)
}

module.exports = {
  signUp
}
