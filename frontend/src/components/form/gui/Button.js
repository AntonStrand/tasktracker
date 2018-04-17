import styled from 'styled-components'

const Button = styled.button`
  /* Adapt the colours based on primary prop */
  background: ${props => (props.primary ? 'palevioletred' : 'white')};
  color: ${props => (props.primary ? 'white' : 'palevioletred')};
  font-size: 1em;
  margin: 0.5em;
  padding: 0.8em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
  ${props => props.fullWidth && 'width: 100%; margin: .8em 0'};
`

export default Button
