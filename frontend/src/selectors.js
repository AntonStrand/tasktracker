import { compose, reduce, complement, either, isEmpty, isNil } from 'ramda'

// isNotNilNorEmpty :: a -> Boolean
const isNotNilNorEmpty = complement(either(isEmpty, isNil))

// indexToArray :: {id: a} -> [a] | []
const indexToArray = index =>
  isNotNilNorEmpty(index) ? Object.keys(index).map(id => index[id]) : []

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

// getProjectTasks :: { id: Task} -> [Task]
export const getProjectTasks = indexToArray
