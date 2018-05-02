import React from 'react'
import styled from 'styled-components'
import { getNumTaskOfStatus } from './../../selectors'
import TaskField from './../../TaskField'
import StatusLink from './StatusLink'
import { TODO, IN_PROGRESS, DONE } from './../../Tag'

const Container = styled.nav`
  margin-bottom: 1.5em;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const Navigation = ({ project, tasksById }) => {
  const numOfTodos = getNumTaskOfStatus(TODO, tasksById)
  const numOfInProgress = getNumTaskOfStatus(IN_PROGRESS, tasksById)
  const numOfDone = getNumTaskOfStatus(DONE, tasksById)
  const numOfAll = numOfTodos + numOfInProgress + numOfDone
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
        <StatusLink status={TODO} numOf={numOfTodos} label='Todo' active />
        <StatusLink
          status={IN_PROGRESS}
          numOf={numOfInProgress}
          label='In progress'
        />
        <StatusLink status={DONE} numOf={numOfDone} label='Done' />
        <StatusLink status={TODO} numOf={numOfAll} label='All' />
      </nav>
    </Container>
  )
}

export default Navigation
