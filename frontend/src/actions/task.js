import { CREATE_NEW_TASK } from './types'

// createTask :: String -> String -> String -> Action
export const createTask = (token, projectId, taskName) => ({
  type: CREATE_NEW_TASK,
  token,
  projectId,
  taskName
})
