import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ExpandArrow from './ExpandArrow'
import styled from 'styled-components'
import StatusOption from './StatusOption'
import Tag from './../../../Tag'

const StatusList = styled.ul`
  visibility: ${props => (props.active ? 'visible' : 'hidden')};
  display: inline;
  list-decoration: none;
  margin: 0;
  padding: 0;
  transition: all 300ms;
  transition-delay: 100ms;
  opacity: ${props => (props.active ? '1' : '0')};
`

const statuses = [
  { label: 'todo', value: 'todo' },
  { label: 'in progress', value: 'in progress' },
  { label: 'done', value: 'done' }
]

class StatusSelect extends Component {
  state = { isActive: false }

  toggleActive = () => this.setState(state => ({ isActive: !state.isActive }))

  // filterOut :: String -> {value:String} -> Boolean
  filterOut = activeStatus => ({ value }) => value !== activeStatus

  render () {
    const isActive = this.state.isActive
    const { activeStatus, onStatusChange } = this.props
    return (
      <div>
        <span onClick={this.toggleActive} style={{ cursor: 'pointer' }}>
          <Tag status={activeStatus}>{activeStatus}</Tag>
          <ExpandArrow active={isActive} />
        </span>
        <StatusList active={isActive}>
          {statuses.filter(this.filterOut(activeStatus)).map((status, key) => (
            <StatusOption
              key={key}
              onClick={evt => {
                evt.preventDefault()
                this.toggleActive()
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
}

StatusSelect.propTypes = {
  activeStatus: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired
}

export default StatusSelect
