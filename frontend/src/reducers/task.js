import { USER_LOGGED_IN } from './../actions/types'

const initialState = {}

const task = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, ...action.tasks }
    default:
      return state
  }
}

export default task
