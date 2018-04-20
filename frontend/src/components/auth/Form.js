import React from 'react'
import PropTypes from 'prop-types'
import FormField from './../form/gui/FormField'
import Message from './../form/gui/Message'
import Button from './../form/gui/Button'

// TODO: Try to separate logic and graphics

class Form extends React.Component {
  state = {
    username: '',
    password: '',
    usernameError: [],
    passwordError: ''
  }

  updateForm = ({ target: t }) =>
    console.log(t.value) || this.setState(state => ({ [t.name]: t.value }))

  validateUsername = () => {
    this.setState(() => ({
      usernameError: []
    }))

    let isValid = true
    if (!/^[a-z-0-9_]{3,20}$/.test(this.state.username)) {
      isValid = false

      if (this.state.username === '') {
        this.setState(state => ({
          usernameError: state.usernameError.concat(['Username is required.'])
        }))
      } else if (
        this.state.username.length < 3 ||
        this.state.username.length > 20
      ) {
        console.log('is not empty')
        this.setState(state => ({
          usernameError: state.usernameError.concat([
            'The username has to be between 3 - 20 characters.'
          ])
        }))
      }

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
      <div style={{ maxWidth: '200px', display: 'inline-block' }}>
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
            onBlur={this.validateUsername}
            error={usernameError}
          />
          <FormField
            type='password'
            name='password'
            label='Password'
            placeholder='••••••••••'
            onChange={this.updateForm}
            onBlur={this.validatePassword}
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

export default Form
