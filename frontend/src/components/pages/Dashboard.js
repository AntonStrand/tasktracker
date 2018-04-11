import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Dashboard = props => <h1>Dashboard {props.name}</h1>

const mapToProps = state => ({ name: state.user.username })

export default connect(mapToProps)(Dashboard)

Dashboard.propTypes = {
  name: PropTypes.string
}
