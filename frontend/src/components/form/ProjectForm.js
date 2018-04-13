import React from 'react'
import Input from './gui/Input'
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

  updateField = ({ target: t }) => {
    console.log(t)
    this.setState(state => ({ [t.name]: { ...state[t.name], value: t.value } }))
    console.log(this.state)
  }

  render () {
    const { onSubmit, token } = this.props
    return (
      <div>
        <form onSubmit={onSubmit(token, this.state)}>
          <h2>Create a new project</h2>
          {Object.entries(this.state).map((field, key) => (
            <Input
              name={field[0]}
              key={key}
              {...field[1]}
              onChange={this.updateField}
            />
          ))}
          <button type='submit'>Create project</button>
        </form>
      </div>
    )
  }
}

const mapToProps = ({ token }) => ({ token })
const mapToDispatch = dispatch => ({
  onSubmit: (token, state) => evt => {
    evt.preventDefault()
    dispatch(createProject(token, state))
  }
})

export default connect(mapToProps, mapToDispatch)(ProjectForm)
