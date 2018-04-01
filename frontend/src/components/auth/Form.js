import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers, withHandlers } from 'recompose'
import { set, lensPath } from 'ramda'

const Form = props => (
  <form>
    <label htmlFor=''>Username</label>
    <input type='text' name='username' onChange={props.updateUsername} />
    <label htmlFor=''>Password</label>
    <input type='password' name='password' onChange={props.updatePassword} />
    <button onClick={props.onSubmit}>{props.submitLabel}</button>
  </form>
)

Form.propTypes = {
  submitLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  updateUsername: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired
}

const updateFormData = key => state => ({ target: t }) =>
  set(lensPath(['formData', key]), t.value, state)

export default compose(
  withStateHandlers(
    () => ({
      formData: {
        username: '',
        password: ''
      }
    }),
    {
      updateUsername: updateFormData('username'),
      updatePassword: updateFormData('password')
    }
  ),
  withHandlers({
    onSubmit: props => e => {
      e.preventDefault()
      console.log(props)
    }
  })
)(Form)
