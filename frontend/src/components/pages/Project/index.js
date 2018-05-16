import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ListView from './ListView'
import Sidebar from './Sidebar'
import Header from './../../gui/Header'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  text-align: left;
  box-sizing: border-box;
  grid-template-columns: 2fr 6fr;
  grid-template-rows: auto auto;
  overflow: hidden;
`

const Project = props => (
  <Wrapper>
    <Header />
    <Sidebar activeProject={props.project} />
    <ListView {...props} />
  </Wrapper>
)

const mapToProps = (state, props) => ({
  project: state.projects.projectsById[props.match.params.id],
  tasksById: state.tasks.groupedByParent[props.match.params.id],
  visibilityFilter: state.tasks.visibilityFilter
})
export default connect(mapToProps)(Project)
