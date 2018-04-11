import { INIT_USER_STATE } from './../actions/types'

const initialState = {
  authToken: null,
  user: null
}

// initUser :: State -> Action -> State
export default (state = initialState, action) =>
  action.type === INIT_USER_STATE ? action.state : state
