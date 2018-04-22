import React from 'react'
import { Input } from './../form/gui'
import { connect } from 'react-redux'

const Project = props =>
  console.log(props.match.params.id, props.project) || (
    <div>
      <Input placeholder='Add task' />
    </div>
  )

const mapToProps = (state, props) => ({
  project: state.projects.find(({ id }) => props.match.params.id)
})

export default connect(mapToProps)(Project)
