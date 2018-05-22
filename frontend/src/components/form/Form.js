import React from 'react'
import PropTypes from 'prop-types'
import equals from 'ramda/src/equals'
import { FormField, Button, Message } from './gui'
import * as R from 'ramda'

// updateItemAtIndex :: Number -> a -> [a] -> [a]
const updateItemAtIndex = (index, item, arr) => {
  return [...arr.slice(0, index), item, ...arr.slice(index + 1)]
}

// setValue :: a -> {value: a} -> {value: a}
const setValue = R.set(R.lensProp('value'))

class Form extends React.Component {
  state = { fields: this.props.fields }

  updateField = index => ({ target: t }) =>
    this.setState(({ fields }) => ({
      fields: updateItemAtIndex(index, setValue(t.value, fields[index]), fields)
    }))

  validate = () => {
    const noErrors = this.state.fields.map(data => ({ ...data, error: null }))
    this.setState(state => ({
      fields: noErrors.map(
        fieldData =>
          fieldData.validate ? fieldData.validate(fieldData) : fieldData
      )
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
            if (this.validate()) {
              onSubmit(token, fields)
            }
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
          <Button primary type='submit' fullWidth>
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
