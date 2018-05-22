import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logOut } from './../../actions/user'
import Form from './../form/ProjectForm'
import Header from './../gui/Header'
import { Redirect } from 'react-router-dom'
import { getProjects } from './../pages/Project/selectors'

const Dashboard = ({ name, projects, numOfProjects }) => {
  return numOfProjects > 0 ? (
    <Redirect to={`project/${projects[0].id}`} />
  ) : (
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
        <p>
          You don't have any projects at the moment. Create one below to get
          started.
        </p>
      </div>
      <Form style={{ maxWidth: '400px', margin: '0 auto' }} />
    </div>
  )
}

const mapToProps = state => ({
  name: state.user.username,
  numOfProjects: state.projects.count,
  projects: getProjects(state.projects)
})

const mapToDispatch = dispatch => ({
  logOut: () => dispatch(logOut())
})

export default connect(mapToProps, mapToDispatch)(Dashboard)

Dashboard.propTypes = {
  name: PropTypes.string.isRequired,
  numOfProjects: PropTypes.number.isRequired,
  projects: PropTypes.array.isRequired
}
