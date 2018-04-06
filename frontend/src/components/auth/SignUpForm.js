import Form from './Form'
import { defaultProps } from 'recompose'
import axios from 'axios'

const onSubmit = user => evt => {
  evt.preventDefault()
  axios
    .post('api/sign-up', user)
    .then(console.log)
    .catch(console.log)
}

const SignUpFrom = defaultProps({
  submitLabel: 'Sign up',
  onSubmit
})(Form)

export default SignUpFrom
