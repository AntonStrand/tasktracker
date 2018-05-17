import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logOut } from './../../actions/user'
import Form from './../form/ProjectForm'
import Header from './../gui/Header'
import { Redirect } from 'react-router-dom'
import { getProjects } from './../pages/Project/selectors'

class Dashboard extends Component {
  state = { numOfProjects: this.props.numOfProjects }

  render () {
    const { name, numOfProjects } = this.props
    const last = numOfProjects - 1
    return this.state.numOfProjects === numOfProjects ? (
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
        </div>
        <Form />
      </div>
    ) : (
      <Redirect to={`project/${this.props.projects[last].id}`} />
    )
  }
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
