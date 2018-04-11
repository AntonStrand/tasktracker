import { INIT_USER_STATE } from './../actions/types'

const initialState = {
  token: null,
  username: '',
  projects: null,
  assignedTasks: null
}

// user :: State -> Action -> State
export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_USER_STATE:
      return action.state
    default:
      return state
  }
}
