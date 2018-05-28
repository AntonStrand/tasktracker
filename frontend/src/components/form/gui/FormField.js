import React from 'react'
import PropTypes from 'prop-types'
import Input from './Input'
import isEmpty from 'ramda/src/isEmpty'
import isNil from 'ramda/src/isNil'
import either from 'ramda/src/either'

import styled from 'styled-components'

const hasMessage = either(isEmpty, isNil)

const Label = styled.label`
  display: block;
  margin-left: 0.5em;
  font-size: 0.8em;
  font-weight: 700;
  color: #6d5584;
`

const Message = styled.div`
  font-weight: 400;
  font-size: 0.8em;
  color: ${props => (props.error ? '#B42C5D' : '#6d5584')};
  text-align: left;
  line-height: 1.5em;
  padding: 0 0.5em;
  p {
    margin: 0.3em 0 0.8em 0;
  }
`

class FormField extends React.Component {
  state = { isActive: false }

  activate = () => this.setState(() => ({ isActive: true }))
  deactivate = () => this.setState(() => ({ isActive: false }))

  render () {
    const { name, label, hint, error, ...rest } = this.props
    const hasError = error && error.length > 0
    const message = error || hint
    return (
      <div style={{ textAlign: 'left', margin: '.5em 0' }}>
        <Label htmlFor={name}>{label}</Label>
        <Input name={name} type='text' {...rest} error={hasError} />
        {!hasMessage(message) && (
          <Message error={hasError}>
            {Array.isArray(message) ? (
              message.map((msg, i) => <p key={i}>{msg}</p>)
            ) : (
              <p>{message}</p>
            )}
          </Message>
        )}
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
