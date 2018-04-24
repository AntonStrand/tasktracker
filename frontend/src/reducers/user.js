import { INIT_USER_STATE, LOG_OUT, ACCESS_DENIED } from './../actions/types'

const initialState = {
  token: null,
  username: '',
  assignedTasks: null
}

// user :: State -> Action -> State
export default (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case INIT_USER_STATE:
      return action.state
    case ACCESS_DENIED:
    case LOG_OUT:
      return {}
    default:
      return state
  }
}
