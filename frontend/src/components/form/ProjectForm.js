import React from 'react'
import { connect } from 'react-redux'
import { createProject } from './../../actions/project'
import { setFormActiveState } from './../../actions/form'
import Form from './Form'
import { safeViewLensPath } from './../pages/Project/selectors'

const fields = [
  {
    name: 'title',
    label: 'Title',
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
    name: 'members',
    label: 'Other members (Optional)',
    value: '',
    type: 'text',
    placeholder: 'mary, john, peter',
    hint: 'Usernames separated with commas. You will be added as default.'
  }
]

const ProjectForm = props => (
  <div>
    <h2>Create a new project</h2>
    <Form buttonLabel='Create project' fields={fields} {...props} />
  </div>
)

// mapToProps :: Redux State -> {a}
const mapToProps = state => ({
  token: state.user.token,
  errors: safeViewLensPath(['form', 'project', 'message'], state).getOrElse(
    null
  )
})

// mapToDispatch :: fn -> {fn}
const mapToDispatch = dispatch => ({
  onSubmit: (token, fields) => {
    dispatch(createProject(token, fields))
    dispatch(setFormActiveState('project', false))
  }
})

export default connect(mapToProps, mapToDispatch)(ProjectForm)
