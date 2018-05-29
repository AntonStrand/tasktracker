import {
  compose,
  complement,
  either,
  isEmpty,
  isNil,
  toLower,
  filter,
  length,
  equals,
  reduce,
  set,
  view,
  lensProp,
  lensPath,
  map,
  curry
} from 'ramda'
import Maybe from 'folktale/maybe'

// isNotNilNorEmpty :: a -> Boolean
const isNotNilNorEmpty = complement(either(isEmpty, isNil))

// indexToArray :: {id: a} -> [a] | []
const indexToArray = index =>
  isNotNilNorEmpty(index) ? Object.keys(index).map(id => index[id]) : []

// filterByStatus :: String -> [ Task | Project ] -> [ Task | Project ]
const filterByStatus = predStatus =>
  filter(({ status }) => status && toLower(status) === toLower(predStatus))

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

// flatten :: [a] -> [a]
const flatten = reduce(
  (xs, x) => (Array.isArray(x) ? [...xs, ...flatten(x)] : [...xs, x]),
  []
)

// showAll :: String -> Boolean
export const showAll = equals('all')

// filterTasks :: String -> [Task] -> [Task]
export const filterTasks = curry(
  (status, tasks) => (showAll(status) ? tasks : filterByStatus(status)(tasks))
)

// getTaskOfStatus :: String -> { id: Task } -> [Task]
export const getTaskOfStatus = (status, tasks) =>
  compose(filterTasks(status), indexToArray)(tasks)

// getVisibleProjectTasks :: String -> { id:Task } -> [Task]
export const getVisibleFromTasksById = (visibilityFilter, tasksById) =>
  compose(filterTasks(visibilityFilter), indexToArray)(tasksById)

// getNumTaskOfStatus :: String -> { id: Task } -> Number
export const getNumTaskOfStatus = compose(length, getTaskOfStatus)

// getProjects :: {id: Project} - [Project]
export const getProjects = ({ projectsById }) => indexToArray(projectsById)

// getProjectTasks :: { id: Task } -> [Task]
export const getProjectTasks = indexToArray

// getAllTasks :: {parent.id: { id:Task }} -> [Task]
export const getAllTasks = compose(flatten, map(indexToArray), indexToArray)

// setValueToAllTasks :: String -> a -> {parent.id: { id:Task }} -> {parent.id: { id:Task }}
export const setValueToAllTasks = (key, value, groupedByParent) =>
  compose(groupTasksByParent, map(set(lensProp(key), value)), getAllTasks)(
    groupedByParent
  )

// safeViewLensPath :: [String] -> {a} -> a
export const safeViewLensPath = curry((path, object) =>
  Maybe.fromNullable(view(lensPath(path), object))
)
