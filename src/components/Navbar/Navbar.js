import React from 'react'
import { compose, withHandlers } from 'recompose'
import localforage from '../../libs/localforage'

import {
  UserNavbar,
  BrandName,
  LogoutButton
} from '../../styles/Navbar.js'

const Navbar = props => (
  <UserNavbar className="navbar navbar-toggleable-md navbar-light bg-faded">
    <BrandName className="navbar-brand" href="#">#ASK</BrandName>
    <LogoutButton
      className="btn btn-danger"
      onClick={() => props.logout()}
    >LOGOUT</LogoutButton>
  </UserNavbar>
)

const NavbarCompose = compose(
  withHandlers({
    logout: props => () => {
      localforage.clear()
      props.history.push('/')
    }
  })
)(Navbar)

export default NavbarCompose
