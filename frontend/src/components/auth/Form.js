import React from 'react'
import PropTypes from 'prop-types'
import FormField from './../form/gui/FormField'
import Message from './../form/gui/Message'

class Form extends React.Component {
  state = {
    username: '',
    password: '',
    usernameError: '',
    passwordError: ''
  }

  updateForm = ({ target: t }) =>
    this.setState(state => ({ [t.name]: t.value }))

  validateUsername = () => {
    this.setState(() => ({
      usernameError: ''
    }))

    let isValid = true
    if (!/^[a-z-0-9_]{3,20}$/.test(this.state.username)) {
      isValid = false
      this.setState(() => ({
        usernameError:
          'The username may only contain lowercase a-z, numbers, underscore (_) and dashes(-).'
      }))

      if (this.state.username.length < 3 || this.state.username.length > 20) {
        this.setState(() => ({
          usernameError: 'The username has to be between 3 - 20 characters.'
        }))
      }

      if (this.state.username === '') {
        this.setState(() => ({ usernameError: 'Username is required.' }))
      }
    }
    return isValid
  }

  validatePassword = () => {
    let isValid = true

    this.setState(() => ({
      passwordError: ''
    }))

    if (this.state.password.length < 6) {
      this.setState(() => ({ passwordError: 'Password is to short.' }))
      isValid = false
    }
    if (this.state.password === '') {
      this.setState(() => ({ passwordError: 'Password is required.' }))
      isValid = false
    }
    return isValid
  }

  validate = () => this.validateUsername() && this.validatePassword()

  render () {
    const { history, onSubmit, submitLabel, errors } = this.props
    const { usernameError, passwordError } = this.state
    return (
      <div>
        <h1>{submitLabel}</h1>
        {errors && <Message message={errors} type='error' />}
        <form
          onSubmit={evt => {
            evt.preventDefault()
            this.validate() && onSubmit(this.state, history).bind(this)(evt)
          }}
        >
          <FormField
            type='text'
            name='username'
            label='Username'
            placeholder='Username'
            onChange={this.updateForm}
            onBlur={this.validateUsername}
            error={usernameError}
          />
          <FormField
            type='password'
            name='password'
            placeholder='Password'
            onChange={this.updateForm}
            onBlur={this.validatePassword}
            error={passwordError}
          />

          <button type='submit'>{submitLabel}</button>
        </form>
      </div>
    )
  }
}

Form.propTypes = {
  submitLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  errors: PropTypes.string
}

export default Form
