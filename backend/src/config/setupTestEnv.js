const userRepo = require('./../repositories/userRepository')

// emptyDBs :: _ -> [Promise Query]
const emptyDBs = () => [
  require('./../models/User').remove({}),
  require('./../models/Task').remove({}),
  require('./../models/Project').remove({})
]

// saveUsers :: [{username: String, password: String}] => _ => [Promise User]
const saveUsers = () =>
  [
    { username: 'existing', password: 'password' },
    { username: 'john', password: 'password' },
    { username: 'paul', password: 'password' }
  ].map(userRepo.save)

module.exports = () =>
  Promise.all(emptyDBs())
    .then(saveUsers)
    .catch(_ => {
      console.log('Test env could not be configured.')
      console.log('Is MongoDB running?')
      process.exit(1)
    })
