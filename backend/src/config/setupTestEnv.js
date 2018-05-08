const userRepo = require('./../repositories/userRepository')
const projectRepo = require('./../repositories/projectRepository')

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
    { username: 'ringo', password: 'password' },
    { username: 'paul', password: 'password' }
  ].map(userRepo.save)

const head = ([x, ...xs]) => x

const createProject = user =>
  projectRepo
    .create({
      title: 'My existing project',
      members: [user.username],
      deadline: null,
      description: 'Describing my project',
      tags: ['test', 'project']
    })
    .then(project => userRepo.addProject(user.username, project._id))

module.exports = () =>
  Promise.all(emptyDBs())
    .then(saveUsers)
    .then(head)
    .then(createProject)
    .catch(_ => {
      console.log('Test env could not be configured.')
      console.log('Is MongoDB running?')
      process.exit(1)
    })
