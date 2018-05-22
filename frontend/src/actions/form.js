import {
  FORM_VALIDATION_ERROR,
  FORM_VALIDATION_SUCCESS,
  FORM_IS_ACTIVE,
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

export const setFormActiveState = (formId, isActive) => ({
  type: FORM_IS_ACTIVE,
  formId,
  isActive
})

export const clearFormState = formId => ({
  type: CLEAR_FORM_STATE,
  formId
})
