import { INIT_USER_STATE, LOG_OUT } from './types'

export const initUserState = state => ({
  type: INIT_USER_STATE,
  state
})

export const logOut = () => ({
  type: LOG_OUT
})
