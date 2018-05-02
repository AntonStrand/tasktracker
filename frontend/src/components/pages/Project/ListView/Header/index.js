import React from 'react'
import styled from 'styled-components'
import ProgressBar from './../../../../gui/ProgressBar'

const Container = styled.div`
  margin-bottom: 1.5em;
`

const Title = styled.h1`
  display: inline-block;
`

const TotalTime = styled.span`
  float: right;
`

const Header = ({ project }) => (
  <Container>
    <Title>{project.title}</Title>
    <TotalTime>
      <Title>{project.totalTime}</Title>
    </TotalTime>
    <ProgressBar
      style={{ borderRadius: '1em', height: '4px' }}
      current={2}
      max={4}
    />
  </Container>
)

export default Header
