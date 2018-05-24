import styled from 'styled-components'

const Header = styled.header`
  grid-row: 1/2;
  display: grid;
  padding: 2em;
  grid-template-columns: auto auto;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

export default Header
