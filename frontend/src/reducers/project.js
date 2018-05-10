import {
  USER_LOGGED_IN,
  NEW_PROJECT_CREATED,
  LOG_OUT
} from './../actions/types'

const initState = { projectsById: {}, count: 0 }

const project = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
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
