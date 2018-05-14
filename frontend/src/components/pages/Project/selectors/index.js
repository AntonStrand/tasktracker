import {
  compose,
  complement,
  either,
  isEmpty,
  isNil,
  toLower,
  filter,
  length,
  equals
} from 'ramda'

// isNotNilNorEmpty :: a -> Boolean
const isNotNilNorEmpty = complement(either(isEmpty, isNil))

// indexToArray :: {id: a} -> [a] | []
const indexToArray = index =>
  isNotNilNorEmpty(index) ? Object.keys(index).map(id => index[id]) : []

// getProjects :: {id: Project} - [Project]
export const getProjects = ({ projectsById }) => indexToArray(projectsById)

// getProjectTasks :: { id: Task } -> [Task]
export const getProjectTasks = indexToArray

// filterByStatus :: String -> [ Task | Project ] -> [ Task | Project ]
const filterByStatus = predStatus =>
  filter(({ status }) => toLower(status) === toLower(predStatus))

// showAll :: String -> Boolean
const showAll = equals('all')

// filterTasks :: String -> [Task] -> [Task]
const filterTasks = status => tasks =>
  showAll(status) ? tasks : filterByStatus(status)(tasks)

// getTaskOfStatus :: String -> { id: Task } -> [Task]
export const getTaskOfStatus = (status, tasks) =>
  compose(filterTasks(status), indexToArray)(tasks)

// getVisibleProjectTasks :: String -> { id:Task } -> [Task]
export const getVisibleFromTasksById = (visibilityFilter, tasksById) =>
  compose(filterTasks(visibilityFilter), indexToArray)(tasksById)

// getNumTaskOfStatus :: String -> { id: Task } -> Number
export const getNumTaskOfStatus = compose(length, getTaskOfStatus)
