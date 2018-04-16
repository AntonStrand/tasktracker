import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Unauthorized from './../components/pages/error/Unauthorized'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Unauthorized to={props.location.pathname} />
      )
    }
  />
)

const mapToProps = ({ user: { token } }) => ({ isAuthenticated: !!token })

export default connect(mapToProps)(PrivateRoute)

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object
}
