import {
  compose,
  reduce,
  complement,
  either,
  isEmpty,
  isNil,
  toLower,
  filter,
  length
} from 'ramda'

// isNotNilNorEmpty :: a -> Boolean
const isNotNilNorEmpty = complement(either(isEmpty, isNil))

// indexToArray :: {id: a} -> [a] | []
const indexToArray = index =>
  isNotNilNorEmpty(index) ? Object.keys(index).map(id => index[id]) : []

// filterByStatus :: String -> [ Task | Project ] -> [ Task | Project ]
const filterByStatus = predStatus =>
  filter(({ status }) => toLower(status) === toLower(predStatus))

// getProjects :: {id: Project} - [Project]
export const getProjects = ({ projectsById }) => indexToArray(projectsById)

// TODO: Make sure it works
// listTaskById :: {parent.id: { id: Task} } -> {id: Task}
export const listTaskById = compose(
  reduce((idx, task) => ({ ...idx, ...task }), {}),
  indexToArray
)

// getAllTasks :: {parent.id: { id: Task } } -> [Task]
export const getAllTasks = compose(indexToArray, listTaskById)

// getProjectTasks :: { id: Task } -> [Task]
export const getProjectTasks = indexToArray

// getTaskOfStatus :: String -> { id: Task } -> [Task]
export const getTaskOfStatus = (status, tasks) =>
  compose(filterByStatus(status), getProjectTasks)(tasks)

// getNumTaskOfStatus :: String -> { id: Task } -> Number
export const getNumTaskOfStatus = compose(length, getTaskOfStatus)
