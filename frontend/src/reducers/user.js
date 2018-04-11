import { INIT_USER_STATE, LOG_OUT } from './../actions/types'

const initialState = {
  token: null,
  username: '',
  projects: null,
  assignedTasks: null
}

// user :: State -> Action -> State
export default (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case INIT_USER_STATE:
      return action.state
    case LOG_OUT:
      return { ...state, token: null }
    default:
      return state
  }
}
