import styled from 'styled-components'
import PropTypes from 'prop-types'

export const TODO = 'todo'
export const DONE = 'done'
export const IN_PROGRESS = 'in progress'

const Tag = styled.span`
  border-radius: 0.5em;
  font-weight: 400;
  font-size: ${({ fontSize }) => fontSize || '0.875em'};
  padding: 0 0.5em;
  margin: auto;
  ${({ status }) =>
    status === DONE
      ? 'background: #E8F8EF; color: #3B9361'
      : status === IN_PROGRESS
        ? 'background: #FBF1DD; color: #886B2C'
        : 'background: #e6e3ea;color: #673ebd'};
`

Tag.propTypes = {
  status: PropTypes.oneOf([TODO, DONE, IN_PROGRESS]).isRequired,
  fontSize: PropTypes.string
}

export default Tag
