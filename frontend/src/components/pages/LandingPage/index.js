import React from 'react'
import CheckListItem from './CheckListItem'
import CheckList from './CheckList'
import TaskTrackerLogo from './TaskTrackerLogo'
import { Button } from './../../form/gui'
import styled from 'styled-components'
import IphonePreviewUrl from './iphone-preview.png'

const IphonePreview = styled.img`
  grid-column: 8/13;
  grid-row: 1/7;
  width: 100%;
  margin: auto;
  max-width: 288px;
  @media (max-width: 700px) {
    display: none;
  }
`

const ButtonContainer = styled.div`
  text-align: left;
  margin-bottom: 2em;
  margin-left: 1em;
  @media (max-width: 700px) {
    display: grid;
    grid-template-columns: auto auto;
    margin: 1.5em 0;
    grid-row: 7;
  }
  @media (max-width: 400px) {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    margin-left: 0;
    grid-row: 7;
  }
`

const Container = styled.div`
  max-width: 1024px;
  margin: auto;
  display: grid;
  grid-gap: 1em;
  padding: 1em;
  text-align: left;
  grid-template-columns: repeat(10, 1fr);

  @media (max-width: 700px) {
    grid-template-columns: repeat(7, 1fr);
  }
`

const Header = styled.header`
  grid-row: 1/2;
  display: grid;
  padding: 2em;
  grid-template-columns: auto auto;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

const Nav = styled.nav`
  display: inline-block;
  text-align: right;
  @media (max-width: 500px) {
    display: none;
  }
`

const Stuff = styled.div`
  text-align: center;
  background: #ffffff;
  box-shadow: 0 0.125em 0.375em -0.125em rgba(0, 0, 0, 0.16),
    0 0.125em 1em -0.25em rgba(116, 58, 175, 0.16);
  border-radius: 0.5em;
  padding: 1.5em;
  padding-bottom: 1em;
`

const LandingPage = () => (
  <div>
    <Header>
      <TaskTrackerLogo />
      <Nav>
        <Button style={{ marginRight: '1em' }}>Log in</Button>
        <Button primary>Sign up</Button>
      </Nav>
    </Header>
    <Container>
      <div
        style={{
          textAlign: 'center',
          margin: 'auto',
          gridColumn: '1/8',
          gridRow: '1/7',
          paddingBottom: '3em',
          display: 'grid',
          gridTemplateColumns: '100%',
          gridTemplateRows: 'auto auto auto'
        }}
      >
        <div
          style={{
            // maxWidth: '400px',
            textAlign: 'left',
            display: 'block',
            margin: 'auto 1.5em',
            gridColumn: '1/8'
          }}
        >
          <h1>Keep it simple, keep it together</h1>
          <p>
            Task tracker is here to help you to easier keep track on your
            project and progress. Make your life easier by having all you
            planning in one place.
          </p>
        </div>
        <ButtonContainer>
          <Button>Log in</Button>
          <Button primary>Sign up</Button>
        </ButtonContainer>
        <Stuff style={{ gridColumn: '1/8' }}>
          <CheckList>
            <CheckListItem>
              Easy overview of your projects and tasks
            </CheckListItem>
            <CheckListItem>
              Collaborate with friends and colleagues
            </CheckListItem>
            <CheckListItem>Works on desktops, tablets and phones</CheckListItem>
          </CheckList>
        </Stuff>
      </div>
      <IphonePreview src={IphonePreviewUrl} alt='Iphone preview' />
    </Container>
  </div>
)

export default LandingPage
