import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createTask } from './../../../../actions/task'
import { Input } from './../../../form/gui'

const notEmpty = taskName => taskName.trim().length > 0

class TaskField extends Component {
  state = { taskName: '' }

  onInputChange = ({ target: t }) =>
    this.setState(() => ({ taskName: t.value }))

  render = () => {
    const { parent, token, onSubmit, style } = this.props
    const { taskName } = this.state
    return (
      <form
        style={style}
        onSubmit={evt => {
          evt.preventDefault()
          if (notEmpty(taskName)) onSubmit(token, parent, taskName)
          this.setState(() => ({ taskName: '' }))
        }}
      >
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
  style: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  parent: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  })
}

const mapToProps = state => ({
  token: state.user.token
})

const mapToDispatch = dispatch => ({
  onSubmit: (token, parent, taskName) =>
    dispatch(createTask(token, parent, taskName))
})

export default connect(mapToProps, mapToDispatch)(TaskField)
