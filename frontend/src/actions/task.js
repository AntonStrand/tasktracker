import {
  CREATE_NEW_TASK,
  CHANGE_TASK_STATUS,
  SET_VISIBILITY_FILTER,
  SET_SELECT_STATUS_STATE,
  CHANGE_TASK_PRIORITY
} from './types'

// createTask :: String -> String -> String -> Action
export const createTask = (token, parent, taskName) => ({
  type: CREATE_NEW_TASK,
  token,
  formData: {
    parent,
    taskName
  }
})

// changeTaskStatus :: String -> String -> String -> Action
export const changeTaskStatus = (token, status, taskId) => ({
  type: CHANGE_TASK_STATUS,
  token,
  status,
  taskId
})

// changeTaskPriority :: String -> Task -> Action
export const changeTaskPriority = (token, tasks) => ({
  type: CHANGE_TASK_PRIORITY,
  token,
  tasks
})

// setVisibilityFilter :: String -> Action
export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export const setSelectStatusState = (task, isActive) => ({
  type: SET_SELECT_STATUS_STATE,
  task: { ...task, isActive }
})
