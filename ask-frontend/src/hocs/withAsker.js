import React from 'react'
import { observer, inject } from 'mobx-react'
import { navigateTo } from 'gatsby-link'
import Navbar from '../components/UserNavbar'
import _ from 'lodash'

const checkValidRoom = ({ roomId, roomName, themeTemplate }) => (
  /^\d+$/.test(roomId) &&
  !_.isEmpty(roomName) &&
  !_.isEmpty(roomName) &&
  /^(?!\s*$).+/.test(roomName) &&
  /^(?!\s*$).+/.test(themeTemplate)
)

const withAsker = Component => {
  @inject(store => ({
    setName: store.ask.setName,
    setRoom: store.ask.setRoom,
    ask: store.ask,
  }))
  @observer
  class WithAskerComponent extends React.Component {
    componentWillMount () {
      const name = localStorage.getItem('name')
      const roomId = localStorage.getItem('roomId')
      const roomName = localStorage.getItem('roomName')
      const themeTemplate = localStorage.getItem('themeTemplate')
      const roomData = {
        roomId,
        roomName,
        themeTemplate,
      }
      const path = this.props.location.pathname
      const isValidRoom = checkValidRoom(roomData)
      if (/^\/$/.test(path)) { // root `/`
        if (!_.isEmpty(name) && isValidRoom) {
          this.props.setName(name)
          this.props.setRoom(roomData)
          navigateTo('/ask')
        } else if (_.isEmpty(name) && isValidRoom) {
          this.props.setRoom(roomData)
          navigateTo('/join')
        }
      } else if (/^\/join(?:\/|\?|$)/.test(path)) { // `/join`
        if (!_.isEmpty(name) && isValidRoom) {
          this.props.setName(name)
          this.props.setRoom(roomData)
          navigateTo('/ask')
        } else if (!isValidRoom) {
          navigateTo('/')
        } else {
          this.props.setRoom(roomData)
        }
      } else if (/^\/ask(?:\/|\?|$)/.test(path)) { // `/ask`
        if (!isValidRoom) {
          navigateTo('/')
        } else if (_.isEmpty(name)) {
          this.props.setRoom(roomData)
          navigateTo('/join')
        } else {
          this.props.setRoom(roomData)
          this.props.setName(name)
        }
      }
    }

    render () {
      const path = this.props.location.pathname
      if (/^\/$/.test(path)) {
        return <Component />
      }
      return (
        <React.Fragment>
          <Navbar {...this.props.ask} />
          <Component {...this.props.ask} />
        </React.Fragment>
      )
    }
  }
  return WithAskerComponent
}

export default withAsker
