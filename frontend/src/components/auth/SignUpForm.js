import Form from './Form'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { safeViewLensPath } from './../pages/Project/selectors'
import {
  formValidationError,
  formValidationSuccess,
  clearFormState,
  setFormActiveState
} from './../../actions/form'

const mapStateToProps = state => ({
  submitLabel: 'Sign up',
  flash: safeViewLensPath(['form', 'signup', 'message'], state).getOrElse(null)
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (user, history) => evt => {
    evt.preventDefault()
    axios
      .post(window.location.origin + '/api/sign-up', user)
      .then(({ data }) => {
        if (data.error) {
          dispatch(formValidationError('signup', data.error))
        } else {
          dispatch(formValidationSuccess('signup', data.message))
          setTimeout(() => {
            dispatch(clearFormState('signup'))
            dispatch(setFormActiveState('login', true))
          }, 2000)
        }
      })
      .catch(
        () =>
          console.log('Some sort of error') ||
          dispatch(
            formValidationError('signup', [
              'Sorry, something went wrong. Please try again later.'
            ])
          )
      )
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form))
