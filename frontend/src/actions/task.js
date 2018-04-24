import { CREATE_NEW_TASK } from './types'

// createTask :: String -> String -> String -> Action
export const createTask = (token, parent, taskName) => ({
  type: CREATE_NEW_TASK,
  token,
  formData: {
    parent,
    taskName
  }
})
