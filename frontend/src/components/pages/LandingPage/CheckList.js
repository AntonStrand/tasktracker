import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CheckListWrapper = styled.div`
  grid-column: 1/8;
  text-align: center;
  background: #ffffff;
  box-shadow: 0 0.125em 0.375em -0.125em rgba(0, 0, 0, 0.16),
    0 0.125em 1em -0.25em rgba(116, 58, 175, 0.16);
  border-radius: 0.5em;
  padding: 1.5em;
  padding-bottom: 1em;
`

const List = styled.ul`
  list-style-type: none;
  text-align: left;
  padding: 0;
  margin: auto;
  display: inline-block;
`

const CheckList = ({ children }) => (
  <CheckListWrapper>
    <List>{children}</List>
  </CheckListWrapper>
)

CheckList.propTypes = {
  children: PropTypes.node
}

export default CheckList
