import { AUTH_USER } from './types'

export const authenticateUser = token => ({
  type: AUTH_USER,
  token
})
