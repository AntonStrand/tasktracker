import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const MessageContainer = styled.div`
  border-radius: 4px;
  border: 1px solid;
  font-size: 0.8em;
  padding: 0 1em;
  margin: 0 0 1em 0;

  ${prop =>
    prop.type === 'error'
      ? `border-color: #d88ea9;
  color: #b42c5d;
  background-color: #faf4f6;`
      : `border-color: #afd3be;
  color: #4d8665;
  background-color: #d6eee0;`}
}
`

const Message = ({ message, type }) => (
  <MessageContainer type={type}>
    {Array.isArray(message) ? (
      message.map((msg, i) => <p key={i}>{msg}</p>)
    ) : (
      <p>{message}</p>
    )}
  </MessageContainer>
)

Message.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  type: PropTypes.string
}

export default Message
