import React from 'react'
import logo from './task-tracker-logo.png'
import styled from 'styled-components'

const Background = styled.div`
  background: #895fad;
  background-image: linear-gradient(22deg, #733aae 0%, #9957ac 100%);
  grid-area: 1/1/2/3;
  padding: 1em 2em;
  line-height: 2.3em;
  text-align: left;
  max-height: 1.5em;
`

const Logo = styled.img`
  height: 1.5em;
`

const Header = () => {
  return (
    <Background>
      <Logo src={logo} alt='TaskTracker' />
    </Background>
  )
}

export default Header
