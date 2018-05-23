import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './../../form/gui'
import PropTypes from 'prop-types'

const Unauthorized = props => (
  <div>
    <h1>401</h1>
    <h4>- unauthorized</h4>
    <p>
      You need to login to access {props.to ? <b>{props.to}</b> : 'this page'}.
    </p>
    <Link to='/'>
      <Button>Sign up</Button>
    </Link>
    <Link to='/login'>
      <Button primary>Log in</Button>
    </Link>
  </div>
)

Unauthorized.propTypes = {
  to: PropTypes.string
}

export default Unauthorized
