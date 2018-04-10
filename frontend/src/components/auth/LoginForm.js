import Form from './Form'
// import { defaultProps } from 'recompose'
import axios from 'axios'
import userAuthenticated from './../../actions/userAuthenticated'
import { connect } from 'react-redux'

const setDefaultProps = () => ({
  submitLabel: 'Login'
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (user, history) => evt => {
    evt.preventDefault()
    axios
      .post('api/login', user)
      .then(response => {
        history.push('/dashboard')
        dispatch(userAuthenticated(response.data.token))
      })
      .catch(console.log)
  }
})

export default connect(setDefaultProps, mapDispatchToProps)(Form)
