import React from 'react'
import './message.css'

const Message = ({ message, type }) => (
  <div className={type || 'success'}>
    {Array.isArray(message) ? (
      message.map(msg => <p>{msg}</p>)
    ) : (
      <p>{message}</p>
    )}
  </div>
)

export default Message
