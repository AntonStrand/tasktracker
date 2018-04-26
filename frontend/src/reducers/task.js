import { USER_LOGGED_IN, NEW_TASK_CREATED } from './../actions/types'

const initialState = { groupedByParent: {}, count: 0 }

const task = (state = initialState, action) => {
  console.log('task:', state, action)

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
    default:
      return state
  }
}

export default task
