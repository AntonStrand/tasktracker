import React from 'react'
import PropTypes from 'prop-types'
import ExpandArrow from './ExpandArrow'
import styled from 'styled-components'
import StatusOption from './StatusOption'
import Tag from './../../../Tag'
import filter from 'ramda/src/filter'
import compose from 'ramda/src/compose'
import { connect } from 'react-redux'
import { setSelectStatusState } from './../../../../../../actions/task'

const StatusList = styled.ul`
  visibility: ${props => (props.active ? 'visible' : 'hidden')};
  display: inline;
  list-decoration: none;
  margin: 0;
  padding: 0;
  opacity: ${props => (props.active ? '1' : '0')};
  transition: all ${props => (props.active ? '300ms' : '0ms')};
  transition-delay: ${props => (props.active ? '100ms' : '0ms')};
`

const statuses = [
  { label: 'todo', value: 'todo' },
  { label: 'in progress', value: 'in progress' },
  { label: 'done', value: 'done' }
]

// filterOut :: String -> {value:String} -> Boolean
const filterOut = activeStatus => filter(({ value }) => value !== activeStatus)

const StatusSelect = ({ task, activeStatus, onStatusChange, setIsActive }) => {
  const isActive = task.isActive || false
  return (
    <div style={{ display: 'inline-block' }}>
      <span
        onClick={() => setIsActive(task, !isActive)}
        style={{ cursor: 'pointer' }}
      >
        <Tag status={activeStatus}>{activeStatus}</Tag>
        <ExpandArrow active={isActive} />
      </span>
      <StatusList active={isActive}>
        {filterOut(activeStatus)(statuses).map((status, key) => (
          <StatusOption
            key={key}
            onClick={evt => {
              evt.preventDefault()
              setIsActive(task, false)
              onStatusChange(status.value)
            }}
          >
            {status.label}
          </StatusOption>
        ))}
      </StatusList>
    </div>
  )
}

StatusSelect.propTypes = {
  task: PropTypes.object.isRequired,
  activeStatus: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  setIsActive: PropTypes.func.isRequired
}

const mapToDispatch = dispatch => ({
  setIsActive: compose(dispatch, setSelectStatusState) // dispatch an event for changing the active state of the task
})

export default connect(null, mapToDispatch)(StatusSelect)
