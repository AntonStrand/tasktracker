import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import StatusSelect from './StatusSelect'
import { changeTaskStatus } from './../../../../../actions/task'
import { connect } from 'react-redux'
import compose from 'ramda/src/compose'

const Container = styled.div`
  background: #FFFFFF;
  box-shadow: 0 .2embackground: #FFFFFF;
  box-shadow: 0 0.125em .25em 0 rgba(99,59,187,0.04), 0 0.125em .25em 0 rgba(122,71,194,0.06), 0 .3em .43em 0 rgba(0,0,0,0.02);
  border-radius: 0.5em;
  margin-bottom: .5em;
  display: grid;
  grid-template-columns: auto auto repeat(3, 1fr);
  grid-gap: 1em;
  padding: 1em 1.5em;
  max-height: 3.5em;
  text-align: left;
`

const Title = styled.h4`
  display: inline-block;
  margin: 0 1em 0 0;
`

const TaskListItem = ({ token, task, onStatusChange }) => {
  const status = task.status.toLowerCase()
  return (
    <Container>
      <Title>{task.title}</Title>

      <StatusSelect
        task={task}
        activeStatus={status}
        onStatusChange={status =>
          console.log('should change to', status) ||
          onStatusChange(token, status, task.id)
        }
      />
    </Container>
  )
}

TaskListItem.propTypes = {
  task: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired
}

const mapToProps = state => ({
  token: state.user.token
})

const mapToDispatch = dispatch => ({
  onStatusChange: compose(dispatch, changeTaskStatus)
})

export default connect(mapToProps, mapToDispatch)(TaskListItem)
