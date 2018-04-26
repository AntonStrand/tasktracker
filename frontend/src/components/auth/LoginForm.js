import Form from './Form'
// import { defaultProps } from 'recompose'
import axios from 'axios'
import { userLoggedIn } from './../../actions/user'
import { formValidationError, clearFormState } from './../../actions/form'
import { connect } from 'react-redux'

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
          history.push('/dashboard')
          dispatch(clearFormState('login'))
          dispatch(userLoggedIn(data))
        }
      })
      .catch(console.log)
  }
})

export default connect(setDefaultProps, mapDispatchToProps)(Form)
