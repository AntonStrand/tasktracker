import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Header from './../../gui/Header'
import ListView from './ListView'
import Sidebar from './Sidebar'
import PropTypes from 'prop-types'
import ProjectForm from './../../form/ProjectForm'
import Modal from 'react-responsive-modal'
import { setFormActiveState } from './../../../actions/form'
import { safeViewLensPath } from './selectors'

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
    console.log(this.props.isCreatingProject)
    return (
      <Wrapper>
        <Modal
          open={this.props.isCreatingProject}
          onClose={this.props.closeModal}
          center
          classNames={{ modal: 'modal', overlay: 'modal-overlay' }}
        >
          <ProjectForm />
        </Modal>

        <Header onMenuIconClick={this.toggleMenu} />
        <Sidebar
          activeProject={this.props.project}
          isOpen={this.state.menuIsOpen}
        />

        <ListView {...this.props} />
      </Wrapper>
    )
  }
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
  isCreatingProject: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

const mapToProps = (state, props) => ({
  project: state.projects.projectsById[props.match.params.id],
  tasksById: state.tasks.groupedByParent[props.match.params.id],
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
