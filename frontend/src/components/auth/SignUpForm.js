import Form from './Form'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  formValidationError,
  formValidationSuccess,
  clearFormState
} from './../../actions/form'

const mapStateToProps = state => ({
  submitLabel: 'Sign up',
  flash: state.form.signUp
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (user, history) => evt => {
    evt.preventDefault()
    axios
      .post('api/sign-up', user)
      .then(({ data }) => {
        console.log(data)
        if (data.error) {
          dispatch(formValidationError('signUp', data.error))
        } else {
          dispatch(formValidationSuccess('signUp', data.message))
          setTimeout(() => {
            dispatch(clearFormState('signUp'))
            history.push('/login')
          }, 2000)
        }
      })
      .catch(console.log)
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form))
