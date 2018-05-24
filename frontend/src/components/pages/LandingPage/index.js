import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { setFormActiveState } from './../../../actions/form'
import LoginForm from './../../auth/LoginForm'
import SignUpFrom from './../../auth/SignUpForm'
import { Button } from './../../form/gui'
import Modal from './../../gui/Modal'
import { safeViewLensPath } from './../Project/selectors'
import ButtonContainer from './ButtonContainer'
import CheckList from './CheckList'
import CheckListItem from './CheckListItem'
import Container from './Container'
import Header from './Header'
import IphonePreview from './IphonePreview'
import Main from './Main'
import Nav from './Nav'
import Section from './Section'
import TaskTrackerLogo from './TaskTrackerLogo'

const LandingPage = ({
  isLoginModalOpen,
  isSignupModalOpen,
  closeModal,
  openModal
}) => (
  <React.Fragment>
    <Modal open={isLoginModalOpen} onClose={closeModal('login')}>
      <LoginForm />
    </Modal>
    <Modal open={isSignupModalOpen} onClose={closeModal('signup')}>
      <SignUpFrom />
    </Modal>
    <Header>
      <TaskTrackerLogo />
      <Nav>
        <Button onClick={openModal('login')}>Log in</Button>
        <Button primary onClick={openModal('signup')}>
          Sign up
        </Button>
      </Nav>
    </Header>

    <Container>
      <Main>
        <Section>
          <h1>Keep it simple, keep it together</h1>
          <p>
            Task tracker is here to help you to easier keep track on your
            project and progress. Make your life easier by having all you
            planning in one place.
          </p>
        </Section>

        <ButtonContainer>
          <Button onClick={openModal('login')}>Log in</Button>
          <Button primary onClick={openModal('signup')}>
            Sign up
          </Button>
        </ButtonContainer>

        <CheckList>
          <CheckListItem>
            Easy overview of your projects and tasks
          </CheckListItem>
          <CheckListItem>Collaborate with friends and colleagues</CheckListItem>
          <CheckListItem>Works on desktops, tablets and phones</CheckListItem>
        </CheckList>
      </Main>
      <IphonePreview />
    </Container>
  </React.Fragment>
)

LandingPage.propTypes = {
  isLoginModalOpen: PropTypes.bool.isRequired,
  isSignupModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired
}

const mapToProps = state => ({
  isLoginModalOpen: safeViewLensPath(
    ['form', 'login', 'isActive'],
    state
  ).getOrElse(false),
  isSignupModalOpen: safeViewLensPath(
    ['form', 'signup', 'isActive'],
    state
  ).getOrElse(false)
})

const mapToDispatch = dispatch => ({
  openModal: label => () => dispatch(setFormActiveState(label, true)),
  closeModal: label => () => dispatch(setFormActiveState(label, false))
})

export default connect(mapToProps, mapToDispatch)(LandingPage)
