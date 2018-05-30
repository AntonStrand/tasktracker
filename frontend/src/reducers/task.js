import {
  USER_LOGGED_IN,
  NEW_TASK_CREATED,
  TASK_STATE_CHANGED,
  SET_VISIBILITY_FILTER,
  SET_SELECT_STATUS_STATE,
  TASK_ORDER_UPDATED
} from './../actions/types'

import lensPath from 'ramda/src/lensPath'
import set from 'ramda/src/set'
import { setValueToAllTasks } from './../components/pages/Project/selectors'

const initialState = { groupedByParent: {}, count: 0, visibilityFilter: 'all' }

const task = (state = initialState, action) => {
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

    case TASK_ORDER_UPDATED:
      return {
        ...state,
        groupedByParent: { ...state.groupedByParent, ...action.tasks }
      }

    case SET_VISIBILITY_FILTER:
      return {
        ...state,
        groupedByParent: setValueToAllTasks(
          'isActive',
          false,
          state.groupedByParent
        ),
        visibilityFilter: action.filter
      }

    case SET_SELECT_STATUS_STATE:
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
