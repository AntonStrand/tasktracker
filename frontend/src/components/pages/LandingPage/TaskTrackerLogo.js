import React from 'react'
import Logo from './task-tracker-logo.png'
import styled from 'styled-components'

const LogoContainer = styled.img`
  height: 2em;
  margin: auto 0;
  @media (max-width: 500px) {
    margin: auto;
  }
`

const TaskTrackerLogo = () => (
  <LogoContainer src={Logo} alt='Task tracker logotype' />
)

export default TaskTrackerLogo
