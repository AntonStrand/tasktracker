import React from 'react'
import styled from 'styled-components'
import ProgressBar from './../../../../gui/ProgressBar'
import PropTypes from 'prop-types'

const Container = styled.div`
  margin-bottom: 1.5em;
`

const Title = styled.h1`
  display: inline-block;
`

const TotalTime = styled.span`
  float: right;
`

// calcPercentage :: Number -> Number -> Number
const calcPercentage = (current, max) =>
  Number.isNaN(current / max) ? 0 : Math.round(current / max * 1000) / 10

const Header = ({ project, current, max }) => (
  <Container>
    <Title>{project.title}</Title>
    <TotalTime>
      <Title>{calcPercentage(current, max) + '%'}</Title>
    </TotalTime>
    <ProgressBar
      style={{ borderRadius: '1em', height: '4px' }}
      current={current}
      max={max}
    />
  </Container>
)

Header.propTypes = {
  project: PropTypes.object.isRequired,
  current: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
}

export default Header
