import React from 'react'
import { connect } from 'react-redux'
import { createProject } from './../../actions/project'
import Form from './Form'

const fields = [
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
    hint: 'What is the purpose of the project.'
  },
  {
    name: 'members',
    label: 'Other members',
    value: '',
    type: 'text',
    placeholder: 'mary, john, peter',
    hint: 'Usernames separated with commas. You will be added as default.'
  },
  {
    name: 'tags',
    label: 'Tags to identify your project',
    value: '',
    type: 'text',
    placeholder: 'awesome, task tracker',
    hint: 'Tags separated with commas.'
  },
  {
    name: 'deadline',
    label: 'Deadline',
    value: '',
    type: 'date'
  }
]

const ProjectForm = props => (
  <div style={{ minWidth: '400px', display: 'inline-block' }}>
    <h2>Create a new project</h2>
    <Form buttonLabel='Create project' fields={fields} {...props} />
  </div>
)

// mapToProps :: Redux State -> {a}
const mapToProps = state => ({
  token: state.user.token,
  errors: state.form.project
})

// mapToDispatch :: fn -> {fn}
const mapToDispatch = dispatch => ({
  onSubmit: (token, fields) => dispatch(createProject(token, fields))
})

export default connect(mapToProps, mapToDispatch)(ProjectForm)
