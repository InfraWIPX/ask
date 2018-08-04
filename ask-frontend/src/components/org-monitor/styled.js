import styled from 'styled-components'
import { Card, CardHeader } from 'reactstrap'

const StyledCardHeader = styled(CardHeader)`
  padding: 0.75rem 0;
  padding-left:0px;
  padding-right:0px;
`
const StyledCard = styled(Card)`
  min-height: 60vh;
`

const Scroll = styled.div`
  overflow-y:scroll;
  overflow-x:hidden;
  height:50%;
`
const List = styled.div`
  padding:15px 20px;
  cursor:pointer;
  transition: .5s;
  border-bottom:1px solid grey;
  border-radius:10px;
  &:hover{
      background-color:#2458ad;
      color:white;
  }
  background: ${props => props.selected && `#3f87ff`};
`

const Select = styled.div`
  padding:15px 20px;
  transition: .5s;
  border-bottom:1px solid grey;
`

export { Scroll, List, StyledCard, StyledCardHeader, Select }