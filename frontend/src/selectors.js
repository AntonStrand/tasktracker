import { compose, reduce } from 'ramda'

// indexToArray :: {id: a} -> [a]
const indexToArray = index => Object.keys(index).map(id => index[id])

// getProjects :: {id: Project} - [Project]
export const getProjects = ({ projectsById }) => indexToArray(projectsById)

// TODO: Make sure it works
// listTaskById :: {parent.id: { id: Task} } -> {id: Task}
export const listTaskById = compose(
  reduce((idx, task) => ({ ...idx, ...task }), {}),
  indexToArray
)

// getAllTasks :: {parent.id: { id: Task} } -> [Task]
export const getAllTasks = compose(indexToArray, listTaskById)

// getProjectTasks :: {parent.id: { id: Task} } -> [Task]
export const getProjectTasks = indexToArray
