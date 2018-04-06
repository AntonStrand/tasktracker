import React from 'react'
import PropTypes from 'prop-types'

class Form extends React.Component {
  state = { username: '', password: '' }

  updateForm = ({ target: t }) =>
    this.setState(state => ({ [t.name]: t.value }))

  render () {
    const { history, onSubmit, submitLabel } = this.props
    return (
      <form onSubmit={onSubmit(this.state, history)}>
        <input
          type='text'
          name='username'
          onChange={this.updateForm}
          placeholder='Username'
        />
        <input
          type='password'
          name='password'
          onChange={this.updateForm}
          placeholder='Password'
        />
        <button type='submit'>{submitLabel}</button>
      </form>
    )
  }
}

Form.propTypes = {
  submitLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default Form
