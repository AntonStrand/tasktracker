import Form from './Form'
import { defaultProps } from 'recompose'
import axios from 'axios'

const onSubmit = user => evt => {
  evt.preventDefault()
  axios
    .post('api/login', user)
    .then(console.log)
    .catch(console.log)
}

const LoginForm = defaultProps({
  submitLabel: 'Login',
  onSubmit
})(Form)

export default LoginForm
