import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const style = {
  height: '.5em'
}

const Bar = styled.div`
  background: #ebebeb;
  height: ${style.height};
`

const Progress = styled.div`
  height: ${style.height};
  width: ${props => props.current / props.max * 100}%;
  background: linear-gradient(to right, #714f8f, #aa87c2);
  border-top-right-radius: 1em;
  border-bottom-right-radius: 1em;
`

const Label = styled.div`
  font-size: 0.8em;
  text-align: right;
`

const ProgressBar = ({ current, max, progressOf }) => (
  <div>
    {progressOf && <Label>{`${current} / ${max} ${progressOf}`}</Label>}
    <Bar>
      <Progress current={current} max={max} />
    </Bar>
  </div>
)

ProgressBar.propTypes = {
  current: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  progressOf: PropTypes.string
}

export default ProgressBar
