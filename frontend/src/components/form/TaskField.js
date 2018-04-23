import React, { Component } from 'react'
import { Input } from './gui'
import { createTask } from './../../actions/task'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class TaskField extends Component {
  state = { taskName: '' }

  onInputChange = ({ target: t }) =>
    this.setState(() => ({ taskName: t.value }))

  render = () => {
    const { projectId, token, onSubmit } = this.props
    const { taskName } = this.state
    return (
      <form onSubmit={onSubmit(token, projectId, taskName)}>
        <Input
          placeholder='Add task'
          value={taskName}
          onChange={this.onInputChange}
        />
      </form>
    )
  }
}

TaskField.propTypes = {
  token: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

const mapToProps = state => ({
  token: state.user.token
})

const mapToDispatch = dispatch => ({
  onSubmit: (token, projectId, taskName) => evt => {
    evt.preventDefault()
    dispatch(createTask(token, projectId, taskName))
  }
})

export default connect(mapToProps, mapToDispatch)(TaskField)
