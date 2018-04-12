import { CREATE_NEW_PROJECT } from './types'

// extractFormValues :: Object -> Object
const extractFormValues = form =>
  Object.entries(form).reduce(
    (res, curr) => ({ ...res, [curr[0]]: curr[1].value }),
    {}
  )

// createProject :: JWT-token, Object -> Action
export const createProject = (token, formState) => ({
  type: CREATE_NEW_PROJECT,
  token,
  formData: extractFormValues(formState)
})
