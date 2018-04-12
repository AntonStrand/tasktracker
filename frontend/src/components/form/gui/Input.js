import React from 'react'

const Input = ({ label, hint, name, ...rest }) => (
  <div style={{ padding: '1em' }}>
    <label style={{ display: 'block' }} htmlFor={name}>
      {label}
    </label>
    <input name={name} type='text' {...rest} />
  </div>
)

export default Input
