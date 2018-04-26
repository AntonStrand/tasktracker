import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  background: #FFFFFF;
  box-shadow: 0 .2embackground: #FFFFFF;
  box-shadow: 0 0.125em .25em 0 rgba(99,59,187,0.04), 0 0.125em .25em 0 rgba(122,71,194,0.06), 0 .3em .43em 0 rgba(0,0,0,0.02);
  border-radius: 0.5em;
  margin-bottom: .5em;
  display: grid;
  grid-template-columns: auto auto repeat(3, 1fr);
  padding: 1em 1.5em;
  max-height: 3.5em;
  text-align: left;
`

const Title = styled.h4`
  display: inline-block;
  margin: 0 1em 0 0;
`

const Tag = styled.span`
  border-radius: 0.5em;
  font-weight: 400;
  font-size: 0.875em;
  padding: 0 0.5em;
  margin: auto;
  ${({ status }) =>
    status === 'done'
      ? 'background: #E8F8EF; color: #3B9361'
      : status === 'in progress'
        ? 'background: #FBF1DD; color: #886B2C'
        : 'background: #e6e3ea;color: #673ebd'};
`

const TaskListItem = ({ task }) => {
  const status = task.status.toLowerCase()
  return (
    <Container>
      <Title>{task.title}</Title>
      <Tag status={status}>{status}</Tag>
    </Container>
  )
}

TaskListItem.propTypes = {
  task: PropTypes.object.isRequired
}
export default TaskListItem