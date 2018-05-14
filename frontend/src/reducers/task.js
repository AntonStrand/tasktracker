import {
  USER_LOGGED_IN,
  NEW_TASK_CREATED,
  TASK_STATE_CHANGED
} from './../actions/types'

import lensPath from 'ramda/src/lensPath'
import set from 'ramda/src/set'

const initialState = { groupedByParent: {}, count: 0 }

const task = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, ...action.tasks }
    case NEW_TASK_CREATED:
      return {
        ...state,
        groupedByParent: {
          ...state.groupedByParent,
          [action.task.parent.id]: {
            [action.task.id]: action.task,
            ...state.groupedByParent[action.task.parent.id]
          }
        },
        count: state.count + 1
      }

    case TASK_STATE_CHANGED:
      return set(
        lensPath(['groupedByParent', action.task.parent.id, action.task.id]),
        action.task,
        state
      )

    default:
      return state
  }
}

export default task
