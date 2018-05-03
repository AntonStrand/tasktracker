// generateToken ::JWT -> User -> JWT-token
module.exports = jwt => user =>
  jwt.sign({ username: user.username, id: user._id }, process.env.JWT_KEY, {
    expiresIn: '1h'
  })
