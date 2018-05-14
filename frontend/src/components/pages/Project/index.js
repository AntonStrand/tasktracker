import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ListView from './ListView'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  text-align: left;
  padding: 0 3em;
  box-sizing: border-box;
`

const Project = props => (
  <Wrapper>
    <ListView {...props} />
  </Wrapper>
)

const mapToProps = (state, props) => ({
  project: state.projects.projectsById[props.match.params.id],
  tasksById: state.tasks.groupedByParent[props.match.params.id],
  visibilityFilter: state.tasks.visibilityFilter
})

export default connect(mapToProps)(Project)
