import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logOut } from './../../actions/user'

const Dashboard = ({ name, logOut }) => (
  <div>
    <h1>Dashboard {name}</h1>
    <button onClick={logOut}>Log out</button>
  </div>
)

const mapToProps = state => ({ name: state.username })

const mapToDispatch = dispatch => ({
  logOut: () => dispatch(logOut())
})

export default connect(mapToProps, mapToDispatch)(Dashboard)

Dashboard.propTypes = {
  name: PropTypes.string,
  logOut: PropTypes.func.isRequired
}
