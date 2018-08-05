import React from 'react'
import OrgMonitor from '../org-monitor'
import OrgSetting from '../org-setting'
import OrgAnalyst from '../org-analyst'
import PropTypes from 'prop-types'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Container } from 'reactstrap'
import classnames from 'classnames'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import Modal from '../Core/Modal'

const Card = styled.div`
  border-radius: 0.75rem !important;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, .4);
  height: 85vh;
`

const CustomeNav = styled(NavLink)`
  cursor: pointer;
`

const Title = styled.h3`
  position: absolute;
  left: 15px;
  top: 7px;
`
@inject('setting')

@observer
class OrgMonitorShow extends React.Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      activeTab: '1',
    }
  }

  toggle (evt) {
    this.setState({ activeTab: evt.target.id })
  }

  render () {
    return (
      <Container fluid>
        <Modal />
        <Row>
          <Col xs={1} />
          <Col xs={10}>
            <Card className='mt-2 rounded p-2'>
              <Nav tabs style={{ flexDirection: 'row-reverse', position: 'relative', marginLeft: 0 }}>
                <Title className={'nav-item'}>
                  <h5 className='nav-link active' style={{ color: 'purple' }}>
                    {this.props.setting.roomName}
                  </h5>
                </Title>
                <NavItem>
                  <CustomeNav
                    className={classnames({ active: this.state.activeTab === '3' })}
                    id='3'
                    onClick={this.toggle}
                  >
                  Analyst
                  </CustomeNav>
                </NavItem>
                <NavItem>
                  <CustomeNav
                    className={classnames({ active: this.state.activeTab === '2' })}
                    id='2'
                    onClick={this.toggle}
                  >
                  Setting
                  </CustomeNav>
                </NavItem>
                <NavItem>
                  <CustomeNav
                    className={classnames({ active: this.state.activeTab === '1' })}
                    id='1'
                    onClick={this.toggle}
                  >
                  Question
                  </CustomeNav>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId='1'>
                  <OrgMonitor {...this.props} />
                </TabPane>
                <TabPane tabId='2'>
                  <Row>
                    <Col>
                      <OrgSetting {...this.props} />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId='3'>
                  <Row>
                    <Col sm='12'>
                      <OrgAnalyst {...this.props} />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}
OrgMonitorShow.propTypes = {
  setting: PropTypes.shape({
    roomName: PropTypes.string.isRequired,
  }),
}

export default OrgMonitorShow
