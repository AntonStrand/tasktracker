import React from 'react'
import PropTypes from 'prop-types'
import { FormField, Button, Message } from './gui'
import { connect } from 'react-redux'
import { createProject } from './../../actions/project'

const fields = {
  title: {
    label: 'Title',
    value: '',
    type: 'text',
    placeholder: 'Awesome project',
    hint: 'The name of the project.',
    required: true
  },
  description: {
    label: 'Description',
    value: '',
    type: 'text',
    placeholder: 'Will solve everything',
    hint: 'What is the purpose of the project.'
  },
  members: {
    label: 'Other members',
    value: '',
    type: 'text',
    placeholder: 'mary, john, peter',
    hint: 'Usernames separated with commas. You will be added as default.'
  },
  tags: {
    label: 'Tags to identify your project',
    value: '',
    type: 'text',
    placeholder: 'awesome, task tracker',
    hint: 'Tags separated with commas.'
  },
  deadline: {
    label: 'Deadline',
    value: '',
    type: 'date'
  }
}

class ProjectForm extends React.Component {
  state = fields

  updateField = ({ target: t }) =>
    this.setState(state => ({ [t.name]: { ...state[t.name], value: t.value } }))

  toggleHint = ({ target: t }) =>
    this.setState(state => ({
      [t.name]: { ...state[t.name], isActive: !state[t.name].isActive }
    }))

  render () {
    const { onSubmit, token, errors } = this.props
    return (
      <div style={{ minWidth: '400px', display: 'inline-block' }}>
        <h2>Create a new project</h2>
        {errors && <Message message={errors} type='error' />}
        <form onSubmit={onSubmit(token, this.state)}>
          {Object.entries(this.state).map((field, key) => (
            <FormField
              name={field[0]}
              key={key}
              {...field[1]}
              onChange={this.updateField}
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
  errors: PropTypes.string
}

// mapToProps :: Redux State -> {a}
const mapToProps = state => ({
  token: state.user.token,
  errors: state.form.project
})

// mapToDispatch :: fn -> {fn}
const mapToDispatch = dispatch => ({
  onSubmit: (token, state) => evt => {
    evt.preventDefault()
    dispatch(createProject(token, state))
  }
})

export default connect(mapToProps, mapToDispatch)(ProjectForm)
