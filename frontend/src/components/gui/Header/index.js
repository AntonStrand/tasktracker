import React from 'react'
import logo from './task-tracker-logo.png'
import styled from 'styled-components'

const Background = styled.div`
  background-image: linear-gradient(-180deg, #633cbc 0%, #814ac4 100%);
  grid-area: 1/1/2/3;
  padding: 1em 2em;
  line-height: 3.3em;
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
