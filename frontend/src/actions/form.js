import { FORM_VALIDATION_ERROR } from './types'

export const formValidationError = (formId, error) => ({
  type: FORM_VALIDATION_ERROR,
  formId,
  error
})
