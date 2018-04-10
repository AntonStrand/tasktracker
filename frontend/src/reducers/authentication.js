import { USER_AUTHENTICADED } from './../actions/types'

const initialState = {
  authToken: null
}

const authReducer = (state = initialState, action) => {
  console.log('action:', action)
  switch (action.type) {
    case USER_AUTHENTICADED:
      return { ...state, authToken: action.token }
    default:
      return state
  }
}

export default authReducer
