import React from 'react'
import styled from 'styled-components'
import { getNumTaskOfStatus } from './../../selectors'
import TaskField from './../../TaskField'
import StatusLink from './StatusLink'
import { TODO, IN_PROGRESS, DONE, ALL } from './../../Tag'
import { connect } from 'react-redux'
import compose from 'ramda/src/compose'
import { setVisibilityFilter } from './../../../../../actions/task'
import PropTypes from 'prop-types'

const Container = styled.nav`
  margin-bottom: 1.5em;
  display: grid;
  grid-template-columns: 20em auto;

  @media (max-width: 1003px) {
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr;
  }
`

const Nav = styled.nav`
  margin: auto 0;
  text-align: right;
  @media (max-width: 1003px) {
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-top: 0.4em;
  }
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

const Navigation = ({ project, tasksById, setFilter, activeItem }) => {
  const navItems = generateNavItems(tasksById)
  return (
    <Container>
      <TaskField parent={{ type: 'project', id: project.id }} />
      <Nav>
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
      </Nav>
    </Container>
  )
}

const mapToProps = state => ({
  activeItem: state.tasks.visibilityFilter
})

const dispatchToProps = dispatch => ({
  setFilter: compose(dispatch, setVisibilityFilter)
})

Navigation.propTypes = {
  project: PropTypes.object.isRequired,
  tasksById: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired
}

export default connect(mapToProps, dispatchToProps)(Navigation)
