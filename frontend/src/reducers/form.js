import {
  FORM_VALIDATION_ERROR,
  FORM_VALIDATION_SUCCESS,
  FORM_IS_ACTIVE,
  CLEAR_FORM_STATE,
  LOG_OUT
} from './../actions/types'

// form :: State -> Action -> State
export default (state = {}, action) => {
  switch (action.type) {
    case FORM_VALIDATION_ERROR:
    case FORM_VALIDATION_SUCCESS:
      return {
        ...state,
        [action.formId]: { ...state[action.formId], ...action.flash }
      }
    case FORM_IS_ACTIVE:
      return {
        ...state,
        [action.formId]: { ...state[action.formId], isActive: action.isActive }
      }
    case CLEAR_FORM_STATE:
      return { ...state, [action.formId]: null }
    case LOG_OUT:
      return {}
    default:
      return state
  }
}
