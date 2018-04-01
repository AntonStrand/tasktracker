import Form from './form'
import { defaultProps } from 'recompose'

const LoginForm = defaultProps({
  submitLabel: 'Login',
  url: '/login'
})(Form)

export default LoginForm
