import React from 'react'
import PropTypes from 'prop-types'

// TODO: Validate forms before posting.

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

      if (this.state.username.length < 4 || this.state.username.length > 20) {
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
    const { history, onSubmit, submitLabel } = this.props
    return (
      <div>
        <h1>{submitLabel}</h1>
        <form
          onSubmit={evt => {
            evt.preventDefault()
            this.validate() && onSubmit(this.state, history)(evt)
          }}
        >
          <input
            type='text'
            name='username'
            onChange={this.updateForm}
            placeholder='Username'
            onBlur={this.validateUsername}
          />
          {this.state.usernameError !== '' && <p>{this.state.usernameError}</p>}
          <input
            type='password'
            name='password'
            onChange={this.updateForm}
            placeholder='Password'
            onBlur={this.validatePassword}
          />
          {this.state.passwordError !== '' && <p>{this.state.passwordError}</p>}
          <button type='submit'>{submitLabel}</button>
        </form>
      </div>
    )
  }
}

Form.propTypes = {
  submitLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default Form
