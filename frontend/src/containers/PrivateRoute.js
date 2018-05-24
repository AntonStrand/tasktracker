import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getState } from './../localStorage'
import { userLoggedIn } from './../actions/user'
import { safeViewLensPath } from './../components/pages/Project/selectors'
import axios from 'axios'
import LandingPage from './../components/pages/LandingPage'

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
        isAuthenticated ? <Component {...rest} /> : <LandingPage />
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
