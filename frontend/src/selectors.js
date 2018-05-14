import {
  compose,
  reduce,
  complement,
  either,
  isEmpty,
  isNil,
  filter,
  equals
} from 'ramda'

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

// filterVisibility :: String -> [{ id:Task }] -> [Task]
const filterVisibility = visibilityFilter =>
  filter(task => task.status.toLowerCase() === visibilityFilter)

// showAll :: String -> Boolean
const showAll = equals('all')

// filterTasks :: String -> [Task] -> [Task]
const filterTasks = filter => allTasks =>
  showAll(filter) ? allTasks : filterVisibility(filter)(allTasks)

// getVisibleProjectTasks :: String -> { id:Task } -> [Task]
export const getVisibleFromTasksById = (visibilityFilter, tasksById) =>
  compose(filterTasks(visibilityFilter), indexToArray)(tasksById)
