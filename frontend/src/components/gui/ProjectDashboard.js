import React from 'react'
import styled from 'styled-components'
import ProjectListItem from './ProjectListItem'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getProjects } from './../pages/Project/selectors'

const Container = styled.div`
  border-radius: 1em;
  background: #fdfdfd;
  padding-bottom: 1.3em;
  box-shadow: 0 2px 8px 0 rgba(99, 59, 187, 0.1),
    0 5px 5px -5px rgba(0, 0, 0, 0.1);
`

const ProjectDashboard = ({ projects }) => (
  <Container>
    <div
      style={{
        padding: '0.5em 1em',
        borderBottom: '1px solid #D6D5D5',
        textAlign: 'left'
      }}
    >
      <h1
        style={{
          display: 'inline-block',
          fontSize: '1.5em',
          fontWeight: '600'
        }}
      >
        Projects
      </h1>
      <a>+ New project</a>
    </div>
    {getProjects(projects).map((project, key) => (
      <Link to={`project/${project.id}`} key={key}>
        <ProjectListItem {...project} />
      </Link>
    ))}
  </Container>
)

ProjectDashboard.propTypes = {
  projects: PropTypes.object.isRequired
}

export default ProjectDashboard
