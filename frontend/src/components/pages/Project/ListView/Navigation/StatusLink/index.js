import React from 'react'
import styled from 'styled-components'
import Tag from './../../../Tag'

const Link = styled.a`
  cursor: pointer;
  margin: 0.5em;
`

const Label = styled.span`
  margin-left: 0.5em;
`

const StatusLink = ({ status, numOf, label }) => (
  <Link
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
