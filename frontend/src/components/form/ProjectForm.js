import React from 'react'
import PropTypes from 'prop-types'
import { FormField, Button, Message } from './gui'
import { connect } from 'react-redux'
import { createProject } from './../../actions/project'
import equals from 'ramda/src/equals'

const fields = {
  fields: [
    {
      name: 'title',
      label: 'Title*',
      value: '',
      type: 'text',
      placeholder: 'Awesome project',
      hint: 'The name of the project.',
      validate: data =>
        data.value === ''
          ? { ...data, error: 'Your project has to have a title.' }
          : data
    },
    {
      name: 'description',
      label: 'Description',
      value: '',
      type: 'text',
      placeholder: 'Will solve everything',
      hint: 'What is the purpose of the project.',
      validate: data => data
    },
    {
      name: 'members',
      label: 'Other members',
      value: '',
      type: 'text',
      placeholder: 'mary, john, peter',
      hint: 'Usernames separated with commas. You will be added as default.',
      validate: data => data
    },
    {
      name: 'tags',
      label: 'Tags to identify your project',
      value: '',
      type: 'text',
      placeholder: 'awesome, task tracker',
      hint: 'Tags separated with commas.',
      validate: data => data
    },
    {
      name: 'deadline',
      label: 'Deadline',
      value: '',
      type: 'date',
      validate: data => data
    }
  ]
}

class ProjectForm extends React.Component {
  state = this.props.state

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
    const { onSubmit, token, errors } = this.props
    const fields = this.state.fields
    return (
      <div style={{ minWidth: '400px', display: 'inline-block' }}>
        <h2>Create a new project</h2>
        {errors && <Message message={errors} type='error' />}
        <form
          onSubmit={evt => {
            evt.preventDefault()
            this.validate() && onSubmit(token, this.state.fields, evt)
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
            Create project
          </Button>
        </form>
      </div>
    )
  }
}

ProjectForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  errors: PropTypes.string,
  state: PropTypes.object.isRequired
}

// mapToProps :: Redux State -> {a}
const mapToProps = state => ({
  token: state.user.token,
  errors: state.form.project,
  state: fields
})

// mapToDispatch :: fn -> {fn}
const mapToDispatch = dispatch => ({
  onSubmit: (token, fields) => dispatch(createProject(token, fields))
})

export default connect(mapToProps, mapToDispatch)(ProjectForm)
