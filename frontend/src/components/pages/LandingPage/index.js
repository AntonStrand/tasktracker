import React from 'react'
import { Button } from './../../form/gui'
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

const LandingPage = () => (
  <React.Fragment>
    <Header>
      <TaskTrackerLogo />
      <Nav>
        <Button>Log in</Button>
        <Button primary>Sign up</Button>
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
          <Button>Log in</Button>
          <Button primary>Sign up</Button>
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

export default LandingPage
