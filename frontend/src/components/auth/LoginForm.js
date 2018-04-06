import Form from './Form'
import { defaultProps } from 'recompose'
import axios from 'axios'

const onSubmit = (user, history) => evt => {
  evt.preventDefault()
  axios
    .post('api/login', user)
    .then(success => history.push('/dashboard'))
    .catch(console.log)
}

const LoginForm = defaultProps({
  submitLabel: 'Login',
  onSubmit
})(Form)

export default LoginForm
