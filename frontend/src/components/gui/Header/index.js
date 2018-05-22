import React from 'react'
import logo from './task-tracker-logo.png'
import menuIcon from './hamburger-icon.png'
import styled from 'styled-components'
import { connect } from 'react-redux'
import compose from 'ramda/src/compose'
import { logOut } from './../../../actions/user'
import PropTypes from 'prop-types'

const Background = styled.div`
  background: #895fad;
  background-image: linear-gradient(22deg, #733aae 0%, #9957ac 100%);
  grid-area: 1/1/2/3;
  display: grid;
  grid-template-columns: 2em 1fr 1fr 2em;
  grid-template-rows: 1em 1.5em 1em;

  @media (max-width: 758px) {
    grid-template-columns: 2em 1fr 1fr 1fr 2em;
  }
  @media (max-width: 380px) {
    grid-template-columns: 1em 1fr 1fr 1fr 1em;
  }
`

const Logo = styled.img`
  height: 1.5em;
  grid-area: 2/2/2/3;
  @media (max-width: 758px) {
    grid-area: 2/3/2/4;
    margin: 0 auto;
  }
`

const HamburgerIcon = styled.img`
  display: none;
  cursor: pointer;
  height: 1em;
  margin: auto 0;
  @media (max-width: 758px) {
    display: inline-block;
    grid-area: 2/2/2/3;
  }
`

const NavLink = styled.span`
  cursor: pointer;
  color: white;
  grid-area: 2/3/3/3;
  text-align: right;
  line-height: 1.8em;
  @media (max-width: 758px) {
    grid-area: 2/4/2/5;
  }
`

const Header = ({ logOut, onMenuIconClick }) => {
  return (
    <Background>
      <HamburgerIcon src={menuIcon} alt='Menu' onClick={onMenuIconClick} />
      <Logo src={logo} alt='TaskTracker' />
      <NavLink onClick={logOut}>Log out</NavLink>
    </Background>
  )
}

Header.propTypes = {
  logOut: PropTypes.func.isRequired,
  onMenuIconClick: PropTypes.func
}

const mapToDispatch = dispatch => ({
  logOut: compose(dispatch, logOut)
})

export default connect(null, mapToDispatch)(Header)
