const R = require('ramda')

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

// arrayToIndex :: [{ id:String, ...a }] -> { id:{a} }
const arrayToIndex = xs =>
  xs.reduce((index, x) => ({ ...index, [x.id]: x }), {})

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
    .then(arrayToIndex)
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
        .then(arrayToIndex)
        .then(index => ({
          tasks: index,
          count: getIndexLength(index)
        }))
    )

const getUserData = async (projectRepo, taskRepo, user) => ({
  username: user.username,
  assignedTasks: user.assignedTasks,
  projects: await createProjectState(projectRepo, user),
  tasks: await createTaskState(projectRepo, taskRepo, user)
})

module.exports = {
  getUserData
}
