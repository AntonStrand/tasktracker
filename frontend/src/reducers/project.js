import {
  INIT_PROJECT_STATE,
  NEW_PROJECT_CREATED,
  LOG_OUT
} from './../actions/types'

const initState = { projectsById: {}, count: 0 }

const project = (state = initState, action) => {
  console.log(state, action)
  switch (action.type) {
    case INIT_PROJECT_STATE:
      return action.projects
    case NEW_PROJECT_CREATED:
      return {
        ...state,
        projectsById: {
          ...state.projectsById,
          [action.project.id]: action.project
        },
        count: state.count + 1
      }
    case LOG_OUT:
      return initState
    default:
      return state
  }
}

export default project
