import { CREATE_NEW_PROJECT } from './types'

// extractFormValues :: Array -> Object
const extractFormValues = form =>
  form.reduce((res, field) => ({ ...res, [field.name]: field.value }), {})

// createProject :: JWT-token, Object -> Action
export const createProject = (token, formState) =>
  console.log(extractFormValues(formState)) || {
    type: CREATE_NEW_PROJECT,
    token,
    formData: extractFormValues(formState)
  }
