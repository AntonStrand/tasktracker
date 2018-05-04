const { map, reduce, reverse } = require('ramda')
const getCleanedProjects = require('./../getCleanedProjects')
const cleanData = require('./../cleanData')

// listAllTaskIds :: [Project] -> [Task.id]
const listAllTaskIds = projects =>
  projects.reduce((tasks, project) => [...tasks, ...project.tasks], [])

// fetchTasks :: TaskRepo -> [Task.id] -> [Task]
const fetchTasks = repo => map(repo.findById)

// groupTasksByParent :: [Task] -> { parent.id: {task.id: Task } }
const groupTasksByParent = reduce(
  (obj, task) => ({
    ...obj,
    [task.parent.id]: !obj[task.parent.id]
      ? { [task.id]: task }
      : { ...obj[task.parent.id], [task.id]: task }
  }),
  {}
)

// tasksToState :: Promise [Task] -> TaskState
const tasksToState = tasks =>
  Promise.all(tasks)
    .then(reverse)
    .then(map(cleanData))
    .then(groupTasksByParent)
    .then(index => ({
      groupedByParent: index,
      count: tasks.length
    }))

// createProjectState :: repository -> repository -> User -> {TaskState}
const createTaskState = (projectRepo, taskRepo, user) =>
  getCleanedProjects(projectRepo, user)
    .then(listAllTaskIds)
    .then(fetchTasks(taskRepo))
    .then(tasksToState)

module.exports = {
  listAllTaskIds,
  fetchTasks,
  groupTasksByParent,
  tasksToState,
  createTaskState
}
