import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getProjects } from './../selectors'
import { connect } from 'react-redux'
import { Button } from './../../../form/gui'
import PropTypes from 'prop-types'
import { setFormActiveState } from './../../../../actions/form'

const Background = styled.div`
  background: #ffffff;
  overflow-y: scroll;
  box-shadow: 0 2px 4px 0 rgba(99, 59, 187, 0.04),
    0 5px 7px 0 rgba(0, 0, 0, 0.02), 0 2px 2px 0 rgba(0, 0, 0, 0);

  @media (max-width: 758px) {
    width: 100vw;
    text-align: center;
    position: absolute;
    left: ${props => (props.isOpen ? '0' : '-100vw')};
    top: 56px;
    height: calc(100vh - 56px);
  }
`

const ListItem = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  display: block;
  padding: 0.8em;
  width: auto;
  color: ${props => (props.active ? '#371952' : '#73657f')};
  ${props => props.active && 'border-left: 0.3em solid #7f4ac4'};
  transition: all 300ms;
  &:hover {
    color: #9957ac;
  }

  @media (max-width: 758px) {
    font-size: 1.2em;
    ${props => props.active && 'background: #9957AC; color: white'};
    border: none;
    &:hover {
      background: #9957ac;
      color: white;
      opacity: 0.8;
    }
  }
`

const ButtonWrapper = styled.div`
  display: block;
  padding: 0.5em 1em;
`

const Sidebar = ({ projects, activeProject, isOpen, openProjectForm }) => {
  return (
    <Background isOpen={isOpen}>
      <ButtonWrapper onClick={openProjectForm}>
        <Button primary fullWidth>
          Create a new project
        </Button>
      </ButtonWrapper>
      {getProjects(projects).map((project, key) => (
        <ListItem
          key={key}
          to={project.id}
          active={project.id === activeProject.id ? 1 : 0}
        >
          {project.title}
        </ListItem>
      ))}
    </Background>
  )
}

const mapToProps = state => ({
  projects: state.projects
})

const mapToDispatch = dispatch => ({
  openProjectForm: () => dispatch(setFormActiveState('project', true))
})

Sidebar.propTypes = {
  projects: PropTypes.object.isRequired,
  activeProject: PropTypes.object.isRequired,
  openProjectForm: PropTypes.func.isRequired,
  isOpen: PropTypes.bool
}

export default connect(mapToProps, mapToDispatch)(Sidebar)
