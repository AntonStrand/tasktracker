import { CREATE_NEW_PROJECT, INIT_PROJECT_STATE } from './types'

// extractFormValues :: Object -> Object
const extractFormValues = form =>
  Object.entries(form).reduce(
    (res, curr) => ({ ...res, [curr[0]]: curr[1].value }),
    {}
  )

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
