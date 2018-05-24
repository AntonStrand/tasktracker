import React from 'react'
import styled from 'styled-components'
import CheckIcon from './icn-check.png'
import PropTypes from 'prop-types'

const CheckBullet = styled.img`
  height: 1.3em;
`

const LI = styled.li`
  margin: 0.2em 0 1em;
  display: grid;
  grid-template-columns: 1.3em auto;
  grid-gap: 0.8em;
`

const CheckListItem = ({ children }) => (
  <LI>
    <CheckBullet src={CheckIcon} alt='–' />
    <span>{children}</span>
  </LI>
)

CheckListItem.propTypes = {
  children: PropTypes.node
}

export default CheckListItem
