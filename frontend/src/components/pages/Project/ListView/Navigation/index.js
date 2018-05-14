import React from 'react'
import styled from 'styled-components'
import { getNumTaskOfStatus } from './../../selectors'
import TaskField from './../../TaskField'
import StatusLink from './StatusLink'
import { TODO, IN_PROGRESS, DONE, ALL } from './../../Tag'
import { connect } from 'react-redux'
import compose from 'ramda/src/compose'
import { setVisibilityFilter } from './../../../../../actions/task'

const Container = styled.nav`
  margin-bottom: 1.5em;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const generateNavItems = tasksById => {
  const numOfTodos = getNumTaskOfStatus(TODO, tasksById)
  const numOfInProgress = getNumTaskOfStatus(IN_PROGRESS, tasksById)
  const numOfDone = getNumTaskOfStatus(DONE, tasksById)
  const numOfAll = numOfTodos + numOfInProgress + numOfDone
  return [
    {
      status: TODO,
      numOf: numOfTodos,
      label: 'Todo'
    },
    {
      status: IN_PROGRESS,
      numOf: numOfInProgress,
      label: 'In progress'
    },
    {
      status: DONE,
      numOf: numOfDone,
      label: 'Done'
    },
    {
      status: ALL,
      numOf: numOfAll,
      label: 'All'
    }
  ]
}

const Navigation = ({ project, tasksById, setFilter, activeItem = ALL }) => {
  const navItems = generateNavItems(tasksById)
  return (
    <Container>
      <TaskField
        style={{ maxWidth: '20em' }}
        parent={{ type: 'project', id: project.id }}
      />
      <nav
        style={{
          margin: 'auto 0',
          textAlign: 'right'
        }}
      >
        {navItems.map((item, key) => (
          <StatusLink
            key={key}
            status={item.status}
            numOf={item.numOf}
            label={item.label}
            active={activeItem === item.status}
            setFilter={setFilter}
          />
        ))}
      </nav>
    </Container>
  )
}

const mapToProps = state => ({
  activeItem: state.visibilityFilter
})

const dispatchToProps = dispatch => ({
  setFilter: compose(dispatch, setVisibilityFilter)
})

export default connect(mapToProps, dispatchToProps)(Navigation)
