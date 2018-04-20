import {
  FORM_VALIDATION_ERROR,
  FORM_VALIDATION_SUCCESS,
  CLEAR_FORM_STATE
} from './types'

export const formValidationError = (formId, message) => ({
  type: FORM_VALIDATION_ERROR,
  formId,
  flash: {
    message,
    type: 'error'
  }
})

export const formValidationSuccess = (formId, message) => ({
  type: FORM_VALIDATION_SUCCESS,
  formId,
  flash: {
    message,
    type: 'success'
  }
})

export const clearFormState = formId => ({
  type: CLEAR_FORM_STATE,
  formId
})
