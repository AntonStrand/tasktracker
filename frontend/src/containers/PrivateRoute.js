import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Unauthorized from './../components/pages/error/Unauthorized'
import { getState } from './../localStorage'
import { userLoggedIn } from './../actions/user'
import { safeViewLensPath } from './../components/pages/Project/selectors'
import axios from 'axios'

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  updateState,
  ...rest
}) => {
  if (!isAuthenticated) {
    getState()
      .chain(safeViewLensPath(['user', 'token']))
      .map(token =>
        axios
          .post('../api/login', { token })
          .then(({ data }) => (!data.error ? updateState(data) : null))
          .catch()
      )
      .getOrElse()
  }

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Unauthorized to={props.location.pathname} />
        )
      }
    />
  )
}

const mapToProps = state => ({
  isAuthenticated: state.user ? !!state.user.token : false
})

const mapToDispatch = dispatch => ({
  updateState: data => dispatch(userLoggedIn(data))
})

export default connect(mapToProps, mapToDispatch)(PrivateRoute)

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  updateState: PropTypes.func.isRequired,
  location: PropTypes.object
}
