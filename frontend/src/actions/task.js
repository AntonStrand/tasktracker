import { CREATE_NEW_TASK, CHANGE_TASK_STATUS } from './types'

// createTask :: String -> String -> String -> Action
export const createTask = (token, parent, taskName) => ({
  type: CREATE_NEW_TASK,
  token,
  formData: {
    parent,
    taskName
  }
})

export const changeTaskStatus = (token, status, taskId) => ({
  type: CHANGE_TASK_STATUS,
  token,
  status,
  taskId
})
