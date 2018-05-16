import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logOut } from './../../actions/user'
import Form from './../form/ProjectForm'
import { Button } from './../form/gui'
import Header from './../gui/Header'

const Dashboard = ({ name, logOut, projects }) => (
  <div>
    <Header />
    <div
      style={{
        display: 'block',
        borderBottom: '1px solid #efefef',
        paddingBottom: '1em'
      }}
    >
      <h1>Welcome, {name}</h1>
      <Button onClick={logOut}>Log out</Button>
    </div>
    <Form />
  </div>
)

const mapToProps = state =>
  console.log(state) || {
    name: state.user.username,
    projects: state.projects
  }

const mapToDispatch = dispatch => ({
  logOut: () => dispatch(logOut())
})

export default connect(mapToProps, mapToDispatch)(Dashboard)

Dashboard.propTypes = {
  name: PropTypes.string.isRequired,
  logOut: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired
}
