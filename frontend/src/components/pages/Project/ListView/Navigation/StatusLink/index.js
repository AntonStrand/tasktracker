import React from 'react'
import styled from 'styled-components'
import Tag from './../../../Tag'

const activeStyle = `
  color: #5a3b75;
  padding-bottom: 0.3em;
  border-bottom: solid 3px rgba(99, 60, 188, 0.7);
`

const Link = styled.a`
  cursor: pointer;
  margin: 0.5em;
  transition: all 300ms;
  :hover {
    ${activeStyle};
  }
  ${props => props.active && activeStyle};
`

const Label = styled.span`
  margin-left: 0.5em;
`

const StatusLink = ({ active, status, numOf, label }) => (
  <Link
    active={active}
    onClick={evt => {
      evt.preventDefault()
      console.log(label, 'clicked')
    }}
  >
    <Tag status={status}>{numOf}</Tag>
    <Label>{label}</Label>
  </Link>
)

export default StatusLink
