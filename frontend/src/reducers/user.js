import { USER_LOGGED_IN, LOG_OUT, ACCESS_DENIED } from './../actions/types'

const initialState = {
  token: null,
  username: '',
  assignedTasks: null
}

// user :: State -> Action -> State
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user
    case ACCESS_DENIED:
    case LOG_OUT:
      return initialState
    default:
      return state
  }
}
