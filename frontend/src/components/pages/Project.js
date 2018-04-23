import React from 'react'
import TaskField from './../form/TaskField'
import { connect } from 'react-redux'

const Project = props => <TaskField />

const mapToProps = (state, props) => ({
  project: state.projects.find(({ id }) => props.match.params.id)
})

export default connect(mapToProps)(Project)
