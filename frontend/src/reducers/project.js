import { INIT_PROJECT_STATE, NEW_PROJECT_CREATED } from './../actions/types'

const project = (state = [], action) => {
  console.log(state, action)
  switch (action.type) {
    case INIT_PROJECT_STATE:
      return action.projects
    case NEW_PROJECT_CREATED:
      return state.concat([action.project])
    default:
      return state
  }
}

export default project
