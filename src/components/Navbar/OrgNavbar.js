import React from 'react'
import { compose, withHandlers } from 'recompose'
import localforage from '../../libs/localforage'
import { NavLink as Link } from 'react-router-dom'
import instance from '../../libs/axios'

import {
  OrgNavbar,
  LogoutButton
} from '../../styles/Navbar.js'

const Navbar = props => (
  <OrgNavbar className="navbar fixed-top navbar-toggleable-md navbar-light bg-faded">
    <div className="row col-12">
      <div className="col-4">
        <div
          className="h5"
          style={{ padding: '5px 0 0 30px' }}
        >
          <Link to='/organizer' className="navbar-brand" style={{ flex: 3 }}>HOME</Link>
        </div>
      </div>
      <div
        className="col-4 text-center"
        style={{ paddingTop: '5px' }}
      >
        #ASK ORGANIZER
      </div>
      <div className="col-4 text-right">
        <LogoutButton
          className="btn point"
          onClick={() => props.logout()}
        >LOGOUT</LogoutButton>
      </div>
    </div>
  </OrgNavbar>
)

const NavbarCompose = compose(
  withHandlers({
    logout: props => async () => {
      localforage.clear()
      await instance.get(`/auth/logout`).then(resp => {
        props.history.push('/organizer/login')
      })
    }
  })
)(Navbar)

export default NavbarCompose