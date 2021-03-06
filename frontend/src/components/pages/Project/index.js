import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Header from './../../gui/Header'
import ListView from './ListView'
import Sidebar from './Sidebar'
import PropTypes from 'prop-types'
import ProjectForm from './../../form/ProjectForm'
import Modal from './../../gui/Modal'
import { setFormActiveState } from './../../../actions/form'
import { safeViewLensPath } from './selectors'
import PageNotFound from './../error/PageNotFound'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  text-align: left;
  box-sizing: border-box;
  grid-template-columns: 2fr 6fr;
  grid-template-rows: 3.5em auto;
  overflow: hidden;

  @media (max-width: 758px) {
    grid-template-columns: 8fr;
  }
`

class Project extends React.Component {
  state = { menuIsOpen: false }

  toggleMenu = () => this.setState(state => ({ menuIsOpen: !state.menuIsOpen }))

  render () {
    const isAuthorized = !!this.props.project

    return isAuthorized ? (
      <Wrapper>
        <Modal
          open={this.props.isCreatingProject}
          onClose={this.props.closeModal}
        >
          <ProjectForm />
        </Modal>

        <Header onMenuIconClick={this.toggleMenu} />
        <Sidebar
          activeProject={this.props.project}
          isOpen={this.state.menuIsOpen}
          onProjectSelect={this.toggleMenu}
        />

        <ListView {...this.props} />
      </Wrapper>
    ) : (
      <PageNotFound />
    )
  }
}

Project.propTypes = {
  isCreatingProject: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  project: PropTypes.object
}

// paramId :: {a} -> String
const paramId = props =>
  safeViewLensPath(['match', 'params', 'id'], props).getOrElse(
    safeViewLensPath(['computedMatch', 'params', 'id'], props).getOrElse()
  )

const mapToProps = (state, props) => ({
  project: state.projects.projectsById[paramId(props)],
  tasksById: state.tasks.groupedByParent[paramId(props)],
  visibilityFilter: state.tasks.visibilityFilter,
  isCreatingProject: safeViewLensPath(
    ['form', 'project', 'isActive'],
    state
  ).getOrElse(false)
})

const mapToDispatch = dispatch => ({
  closeModal: () => dispatch(setFormActiveState('project', false))
})

export default connect(mapToProps, mapToDispatch)(Project)
