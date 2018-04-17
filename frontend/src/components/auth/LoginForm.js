import Form from './Form'
// import { defaultProps } from 'recompose'
import axios from 'axios'
import { initUserState } from './../../actions/user'
import { initProjectState } from './../../actions/project'
import { formValidationError } from './../../actions/form'
import { connect } from 'react-redux'

const setDefaultProps = state => ({
  submitLabel: 'Login',
  errors: state.form.login
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
          dispatch(initUserState(data))
          dispatch(initProjectState(data.projects))
        }
      })
      .catch(console.log)
  }
})

export default connect(setDefaultProps, mapDispatchToProps)(Form)
