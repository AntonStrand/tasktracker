import {
  INIT_PROJECT_STATE,
  NEW_PROJECT_CREATED,
  LOG_OUT
} from './../actions/types'

const project = (state = { projectsById: {}, count: 0 }, action) => {
  console.log(state, action)
  switch (action.type) {
    case INIT_PROJECT_STATE:
      return action.projects
    case NEW_PROJECT_CREATED:
      return state.concat([action.project])
    case LOG_OUT:
      return []
    default:
      return state
  }
}

export default project
