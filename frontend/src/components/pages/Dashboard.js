import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logOut } from './../../actions/user'
import Form from './../form/ProjectForm'
import { Button } from './../form/gui'

const Dashboard = ({ name, logOut }) => (
  <div>
    <div
      style={{
        display: 'block',
        borderBottom: '1px solid #efefef',
        paddingBottom: '1em'
      }}
    >
      <h1>Dashboard {name}</h1>
      <Button onClick={logOut}>Log out</Button>
    </div>
    <Form />
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
