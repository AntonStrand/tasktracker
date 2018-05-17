import React from 'react'
import logo from './task-tracker-logo.png'
import styled from 'styled-components'
import { connect } from 'react-redux'
import compose from 'ramda/src/compose'
import { logOut } from './../../../actions/user'

const Background = styled.div`
  background: #895fad;
  background-image: linear-gradient(22deg, #733aae 0%, #9957ac 100%);
  grid-area: 1/1/2/3;
  display: grid;
  grid-template-columns: 2em 1fr 1fr 2em;
  grid-template-rows: 1em 1.5em 1em;
`

const Logo = styled.img`
  height: 1.5em;
  grid-area: 2/2/2/3;
`

const NavLink = styled.span`
  cursor: pointer;
  color: white;
  grid-area: 2/3/3/3;
  text-align: right;
  line-height: 1.8em;
`

const Header = ({ logOut }) => {
  return (
    <Background>
      <Logo src={logo} alt='TaskTracker' />
      <NavLink onClick={logOut}>Log out</NavLink>
    </Background>
  )
}

const mapToDispatch = dispatch => ({
  logOut: compose(dispatch, logOut)
})

export default connect(null, mapToDispatch)(Header)
