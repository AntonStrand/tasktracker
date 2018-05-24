import React from 'react'
import PropTypes from 'prop-types'
import { FormField, Message, Button } from './../form/gui'
import { withRouter } from 'react-router'

class Form extends React.Component {
  state = {
    username: '',
    password: '',
    usernameError: [],
    passwordError: ''
  }

  updateForm = ({ target: t }) =>
    this.setState(state => ({ [t.name]: t.value.trim() }))

  validateUsername = () => {
    this.setState(() => ({
      usernameError: []
    }))

    let isValid = true

    if (
      this.state.username.trim().length < 3 ||
      this.state.username.trim().length > 20
    ) {
      isValid = false
      this.setState(state => ({
        usernameError: state.usernameError.concat([
          'The username has to be between 3 - 20 characters.'
        ])
      }))
    }

    if (this.state.username.trim() === '') {
      isValid = false
      this.setState(state => ({
        usernameError: state.usernameError.concat(['Username is required.'])
      }))
    } else if (!/^[a-z0-9_-]+$/.test(this.state.username)) {
      isValid = false
      this.setState(state => ({
        usernameError: state.usernameError.concat([
          'The username may only contain lowercase a-z, numbers, underscore (_) and dashes(-).'
        ])
      }))
    }

    return isValid
  }

  validatePassword = () => {
    let isValid = true

    this.setState(() => ({
      passwordError: ''
    }))

    if (this.state.password.length < 6) {
      this.setState(() => ({ passwordError: 'Password is too short.' }))
      isValid = false
    }
    if (this.state.password === '') {
      this.setState(() => ({ passwordError: 'Password is required.' }))
      isValid = false
    }
    return isValid
  }

  validate = () => {
    const validUsername = this.validateUsername()
    const validPassword = this.validatePassword()
    return validUsername && validPassword
  }

  render () {
    const { history, onSubmit, submitLabel, flash } = this.props
    const { usernameError, passwordError } = this.state
    return (
      <div>
        <h1>{submitLabel}</h1>
        {flash && <Message message={flash.message} type={flash.type} />}
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
            placeholder='username'
            onChange={this.updateForm}
            error={usernameError}
          />
          <FormField
            type='password'
            name='password'
            label='Password'
            placeholder='••••••••••'
            onChange={this.updateForm}
            error={passwordError}
          />

          <Button primary fullWidth type='submit'>
            {submitLabel}
          </Button>
        </form>
      </div>
    )
  }
}

Form.propTypes = {
  submitLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  flash: PropTypes.shape({
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    type: PropTypes.string
  })
}

export default withRouter(Form)
