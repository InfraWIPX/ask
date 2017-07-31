import styled from 'styled-components'

const PrimaryColor = '#1C0F43'
const HoverColor = '#140346'

const UserNavbar = styled.nav`
  flex-direction: row;
  background-color: rgba(255,255,255,0.8);
`

const OrgNavbar = styled.nav`
  background-color: rgba(255, 255, 255, 0.6);
  margin-bottom: 15px;
  flex-direction: row;
  color: white;
`

const BrandName = styled.a`
  flex: 3
`

const LogoutButton = styled.button`
  flex: 1;
  color: white;
  //boder-radius: 10px; Cannot write
  background-color: ${PrimaryColor};
  border-color: ${PrimaryColor};

  &:hover {
    color: white;
    background-color: ${HoverColor};
    border-color: ${HoverColor};
  }
`

export {
  UserNavbar,
  OrgNavbar,
  BrandName,
  LogoutButton
}
