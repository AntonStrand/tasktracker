import { USER_LOGGED_IN, LOG_OUT } from './types'

export const logOut = () => ({
  type: LOG_OUT
})

export const userLoggedIn = payload => ({
  type: USER_LOGGED_IN,
  ...payload
})
