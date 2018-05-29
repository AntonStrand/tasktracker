import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import StatusSelect from './StatusSelect'
import { changeTaskStatus } from './../../../../../actions/task'
import { connect } from 'react-redux'
import compose from 'ramda/src/compose'
import { SortableElement } from 'react-sortable-hoc'

const Container = styled.li`
  background: #ffffff;
  box-shadow: 0 0.125em 0.25em 0 rgba(99, 59, 187, 0.04),
    0 0.125em 0.25em 0 rgba(122, 71, 194, 0.06),
    0 0.3em 0.43em 0 rgba(0, 0, 0, 0.02);
  border-radius: 0.5em;
  margin-bottom: 0.5em;
  padding: 0.8em 1.5em;
  text-align: left;
  list-style-type: none;
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  user-select: none;
  &:active {
    cursor: grabbing;
  }
`

const Title = styled.h4`
  display: inline;
  line-height: 1.5em;
  margin: 0 1em 0 0;
`

const TaskListItem = ({ token, task, onStatusChange, style }) => {
  const status = task.status ? task.status.toLowerCase() : 'todo'
  return (
    <Container style={style} isActive>
      <Title>{task.title}</Title>

      <StatusSelect
        task={task}
        activeStatus={status}
        onStatusChange={status => onStatusChange(token, status, task.id)}
      />
    </Container>
  )
}

TaskListItem.propTypes = {
  task: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  style: PropTypes.object
}

const mapToProps = state => ({
  token: state.user.token
})

const mapToDispatch = dispatch => ({
  onStatusChange: compose(dispatch, changeTaskStatus)
})

export default SortableElement(connect(mapToProps, mapToDispatch)(TaskListItem))
