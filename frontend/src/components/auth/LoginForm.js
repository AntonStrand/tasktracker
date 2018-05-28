import Form from './Form'
import axios from 'axios'
import { userLoggedIn } from './../../actions/user'
import { formValidationError, clearFormState } from './../../actions/form'
import { connect } from 'react-redux'
import { getProjects, safeViewLensPath } from './../pages/Project/selectors'

const setDefaultProps = state => ({
  submitLabel: 'Login',
  flash: safeViewLensPath(['form', 'login', 'message'], state).getOrElse(null)
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (user, history) => evt => {
    evt.preventDefault()
    axios
      .post(window.location.origin + '/api/login', user)
      .then(({ data }) => {
        if (data.error) {
          dispatch(formValidationError('login', data.error))
        } else {
          data.projects.count > 0
            ? history.push(`/project/${getProjects(data.projects)[0].id}`)
            : history.push('/')
          dispatch(clearFormState('login'))
          dispatch(userLoggedIn(data))
        }
      })
      .catch(
        () =>
          console.log('Some sort of error') ||
          dispatch(
            formValidationError('login', [
              'Sorry, something went wrong. Please try again later.'
            ])
          )
      )
  }
})

export default connect(setDefaultProps, mapDispatchToProps)(Form)
