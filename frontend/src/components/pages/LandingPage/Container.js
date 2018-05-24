import styled from 'styled-components'

const Container = styled.div`
  max-width: 1024px;
  margin: auto;
  display: grid;
  grid-gap: 1em;
  padding: 0 3em;
  text-align: left;
  grid-template-columns: repeat(10, 1fr);

  @media (max-width: 700px) {
    padding: 1em;
    grid-template-columns: repeat(7, 1fr);
  }
`

export default Container
