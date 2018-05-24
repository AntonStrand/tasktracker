import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './../../form/gui'
import PropTypes from 'prop-types'

const PageNotFound = props => (
  <div>
    <h1>404</h1>
    <h4>- page not found</h4>
    <p>
      Sorry, but we couln't find {props.to ? <b>{props.to}</b> : 'this page'}.<br />
      Perhaps you need to log in to access it.
    </p>
    <Link to='/'>
      <Button primary>Go to the start page</Button>
    </Link>
  </div>
)

PageNotFound.propTypes = {
  to: PropTypes.string
}

export default PageNotFound
