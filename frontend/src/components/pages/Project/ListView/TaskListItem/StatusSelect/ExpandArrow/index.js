import React from 'react'
import arrow from './expand-arrow.png'
import styled from 'styled-components'

const Image = styled.img`
  width: 24px;
  height: 16px;
  transition: all 300ms;
  display: inline;
  vertical-align: middle;
  transform-origin: center;
  margin: 0 0.5em
    ${props =>
    props.active &&
      'transform: rotate(-90deg) translateX(2px) translateY(3px)'};
`

const ExpandArrow = props => (
  <Image src={arrow} alt='show available statuses' {...props} />
)

export default ExpandArrow
