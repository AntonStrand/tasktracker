import { CREATE_NEW_PROJECT, INIT_PROJECT_STATE } from './types'

// extractFormValues :: Array -> Object
const extractFormValues = form =>
  form.reduce((res, field) => ({ ...res, [field.name]: field.value }), {})

// initProjectState :: [Project] -> Action
export const initProjectState = projects => ({
  type: INIT_PROJECT_STATE,
  projects
})

// createProject :: JWT-token, Object -> Action
export const createProject = (token, formState) => ({
  type: CREATE_NEW_PROJECT,
  token,
  formData: extractFormValues(formState)
})
