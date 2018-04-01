import Form from './Form'
import { defaultProps } from 'recompose'

const SignUpFrom = defaultProps({
  submitLabel: 'Sign up',
  url: '/sign-up'
})(Form)

export default SignUpFrom
