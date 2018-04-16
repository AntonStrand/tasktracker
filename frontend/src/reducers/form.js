import { FORM_VALIDATION_ERROR } from './../actions/types'

// form :: State -> Action -> State
export default (state = { form: null }, action) => {
  console.log(action)
  switch (action.type) {
    case FORM_VALIDATION_ERROR:
      return { ...state, [action.formId]: action.error }
    default:
      return state
  }
}
