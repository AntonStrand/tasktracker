import styled from 'styled-components'

const ButtonContainer = styled.div`
  text-align: left;
  margin-bottom: 2em;
  margin-left: 1em;
  @media (max-width: 700px) {
    display: grid;
    grid-template-columns: auto auto;
    margin: 1.5em 0 0;
    grid-row: 7;
  }
  @media (max-width: 400px) {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    margin-left: 0;
    grid-row: 7;
  }
`

export default ButtonContainer
