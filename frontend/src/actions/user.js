import { INIT_USER_STATE, LOG_OUT } from './types'

export const initUserState = ({ username, token, assignedTasks }) => ({
  type: INIT_USER_STATE,
  state: {
    assignedTasks,
    username,
    token
  }
})

export const logOut = () => ({
  type: LOG_OUT
})
