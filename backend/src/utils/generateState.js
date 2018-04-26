const R = require('ramda')
const jwt = require('jsonwebtoken')

// cleanProjectData :: Project -> {Project}
const cleanProjectData = pd => ({
  members: pd.members,
  status: pd.status,
  tasks: pd.tasks,
  totalTime: pd.totalTime,
  tags: pd.tags,
  id: pd._id,
  title: pd.title,
  description: pd.description,
  deadline: pd.deadline,
  createdAt: pd.createdAt,
  updatedAt: pd.updatedAt
})

// cleanTaskData :: Task -> {Task}
const cleanTaskData = td => ({
  title: td.title,
  status: td.status,
  id: td._id,
  description: td.description,
  timer: td.timer,
  priority: td.priority,
  assignees: td.assignees,
  parent: td.parent,
  deadline: td.deadline,
  createdAt: td.createdAt,
  updatedAt: td.updatedAt
})

// indexProjects :: [Project] -> { project.id: Project }
const indexProjects = R.reduce(
  (index, project) => ({ ...index, [project['id']]: project }),
  {}
)

// groupTasksByParent :: [Task] -> { parent.id: [{task.id: Task }] }
const groupTasksByParent = R.reduce(
  (obj, task) => ({
    ...obj,
    [task.parent.id]: !obj[task.parent.id]
      ? [{ [task.id]: task }]
      : [...obj[task.parent.id], { [task.id]: task }]
  }),
  {}
)

// getIndexLength :: Object -> Number
const getIndexLength = index => Object.keys(index).length

const getCleanedProjects = (projectRepo, user) =>
  Promise.all(
    user.projects.map(id =>
      projectRepo
        .findById(id)
        .then(cleanProjectData)
        .catch(() => 'An error occured while fetching this project.')
    )
  )

// mergeTasks :: {Project} -> [String]
const mergeTasks = projects =>
  projects.reduce((tasks, project) => [...tasks, ...project.tasks], [])

// createProjectState :: repository -> User -> {ProjectState}
const createProjectState = (projectRepo, user) =>
  getCleanedProjects(projectRepo, user)
    .then(indexProjects)
    .then(index => ({
      projectsById: index,
      count: getIndexLength(index)
    }))
    .catch(() => 'An error occured while fetching your projects.')

// createProjectState :: repository -> repository -> User -> {TaskState}
const createTaskState = (projectRepo, taskRepo, user) =>
  getCleanedProjects(projectRepo, user)
    .then(mergeTasks)
    .then(R.map(taskRepo.findById))
    .then(tasks =>
      Promise.all(tasks)
        .then(R.map(cleanTaskData))
        .then(groupTasksByParent)
        .then(index => ({
          groupedByParent: index,
          count: tasks.length
        }))
    )

const generateToken = user =>
  jwt.sign({ username: user.username, id: user._id }, process.env.JWT_KEY, {
    expiresIn: '1h'
  })

const getUserData = async (projectRepo, taskRepo, user) => ({
  user: {
    token: generateToken(user),
    username: user.username,
    assignedTasks: user.assignedTasks
  },
  projects: await createProjectState(projectRepo, user),
  tasks: await createTaskState(projectRepo, taskRepo, user)
})

module.exports = {
  getUserData
}
