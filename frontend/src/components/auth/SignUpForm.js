import Form from './Form'
import { defaultProps } from 'recompose'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

const onSubmit = (user, history) => evt => {
  evt.preventDefault()
  axios
    .post('api/sign-up', user)
    .then(success => history.push('/login'))
    .catch(console.log)
}

const SignUpFrom = defaultProps({
  submitLabel: 'Sign up',
  onSubmit
})(Form)

export default withRouter(SignUpFrom)
