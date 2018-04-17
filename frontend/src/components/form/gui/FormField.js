import React from 'react'
import PropTypes from 'prop-types'
import Message from './Message'
import Input from './Input'

import styled from 'styled-components'

const Label = styled.label`
  display: block;
  margin-left: 0.5em;
  font-size: 0.8em;
  font-weigth: 700;
  color: #1b1e20;
`

class FormField extends React.Component {
  state = { isActive: false }

  activate = () => this.setState(() => ({ isActive: true }))
  deactivate = () => this.setState(() => ({ isActive: false }))

  render () {
    const { name, label, hint, error, ...rest } = this.props
    return (
      <div style={{ textAlign: 'left', margin: '.5em 0' }}>
        <Label htmlFor={name}>{label}</Label>
        <Input
          name={name}
          type='text'
          {...rest}
          onFocus={this.activate}
          onBlur={this.deactivate}
          error={error}
        />
        {error ? (
          <Message type='error' message={error} />
        ) : hint && this.state.isActive ? (
          <Message message={hint} />
        ) : null}
      </div>
    )
  }
}

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

export default FormField
