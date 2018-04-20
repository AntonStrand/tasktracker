import React from 'react'
import styled from 'styled-components'
import ProgressBar from './ProgressBar'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  text-align: left;
  cursor: pointer;
  :hover {
    background: rgba(245, 245, 247, 0.5);
  }
`

const Title = styled.h2`
  margin: 1.2em;
  font-size: 1em;
  font-weight: 600;
  color: #371952;
  display: inline-block;
`

const ProgressInfo = styled.div`
  margin: 1.2em;
  color: #371952;
  display: inline-block;
  font-size: 0.8em;
  text-align: right;
  float: right;
  line-height: 2.4em;
`
// TODO: Use tasks to calculate progress.

const ProjectListItem = ({ title, tasks }) => (
  <Wrapper>
    <Title>{title}</Title>
    <ProgressInfo>20 / 100 tasks</ProgressInfo>
    <ProgressBar current={20} max={100} />
  </Wrapper>
)

ProjectListItem.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired
}

export default ProjectListItem
