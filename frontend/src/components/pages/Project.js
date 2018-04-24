import React from 'react'
import TaskField from './../form/TaskField'
import { connect } from 'react-redux'

const Project = ({ project }) =>
  console.log(project) || (
    <TaskField parent={{ type: 'project', id: project.id }} />
  )

const mapToProps = (state, props) => ({
  project: state.projects.projectsById[props.match.params.id]
})

export default connect(mapToProps)(Project)
