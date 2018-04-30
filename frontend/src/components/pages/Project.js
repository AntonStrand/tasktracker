import React from 'react'
import TaskField from './../form/TaskField'
import { connect } from 'react-redux'
import { getProjectTasks } from './../../selectors'
import TaskListItem from './../Task/TaskListItem'
import styled from 'styled-components'
import ProgressBar from './../gui/ProgressBar'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  text-align: left;
  padding: 0 3em;
  box-sizing: border-box;
`

const Header = styled.div`
  margin-bottom: 1.5em;
`

const Title = styled.h1`
  display: inline-block;
`

const TotalTime = styled.span`
  float: right;
`

const Project = ({ project, tasksById }) => (
  <Wrapper>
    <Header>
      <Title>{project.title}</Title>
      <TotalTime>
        <Title>{project.totalTime}</Title>
      </TotalTime>
      <ProgressBar style={{ borderRadius: '1em', height: '4px' }} />
    </Header>
    <TaskField
      style={{ maxWidth: '20em' }}
      parent={{ type: 'project', id: project.id }}
    />
    {getProjectTasks(tasksById).map((task, key) => (
      <TaskListItem task={task} key={key} />
    ))}
  </Wrapper>
)

const mapToProps = (state, props) => ({
  project: state.projects.projectsById[props.match.params.id],
  tasksById: state.tasks.groupedByParent[props.match.params.id]
})

export default connect(mapToProps)(Project)
