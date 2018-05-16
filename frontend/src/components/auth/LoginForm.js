import Form from './Form'
import axios from 'axios'
import { userLoggedIn } from './../../actions/user'
import { formValidationError, clearFormState } from './../../actions/form'
import { connect } from 'react-redux'
import { getProjects } from './../pages/Project/selectors'

const setDefaultProps = state => ({
  submitLabel: 'Login',
  flash: state.form.login
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (user, history) => evt => {
    evt.preventDefault()
    axios
      .post('api/login', user)
      .then(({ data }) => {
        if (data.error) {
          dispatch(formValidationError('login', data.error))
        } else {
          data.projects.count > 0
            ? history.push(`/project/${getProjects(data.projects)[0].id}`)
            : history.push('/dashboard')
          dispatch(clearFormState('login'))
          dispatch(userLoggedIn(data))
        }
      })
      .catch(console.log)
  }
})

export default connect(setDefaultProps, mapDispatchToProps)(Form)
