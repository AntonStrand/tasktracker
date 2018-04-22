import React from 'react'
import PropTypes from 'prop-types'
import equals from 'ramda/src/equals'
import { FormField, Button, Message } from './gui'

class Form extends React.Component {
  state = { fields: this.props.fields }

  updateField = key => ({ target: t }) =>
    this.setState(({ fields }) => [...fields, (fields[key].value = t.value)])

  validate = () => {
    const noErrors = this.state.fields.map(data => ({ ...data, error: null }))
    this.setState(state => ({
      fields: noErrors.map(fieldData => fieldData.validate(fieldData))
    }))

    return equals(noErrors, this.state.fields)
  }

  render () {
    const { onSubmit, token, errors, buttonLabel } = this.props
    const fields = this.state.fields
    return (
      <div>
        {errors && <Message message={errors} type='error' />}
        <form
          onSubmit={evt => {
            evt.preventDefault()
            this.validate() && onSubmit(token, this.state.fields)
          }}
        >
          {fields.map(({ name, validate, ...props }, key) => (
            <FormField
              key={key}
              name={name}
              {...props}
              onChange={this.updateField(key)}
            />
          ))}
          <Button primary type='submit'>
            {buttonLabel}
          </Button>
        </form>
      </div>
    )
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  errors: PropTypes.string
}

export default Form
