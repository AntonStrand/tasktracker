import styled from 'styled-components'

const Button = styled.button`
  outline: none;
  border: none;
  box-shadow: none;
  box-sizing: border-box;
  /* Adapt the colours based on primary prop */
  ${props =>
    props.primary
      ? 'background: #895FAD; background-image: linear-gradient(22deg, #733AAE 0%, #9957AC 100%); color: white'
      : 'background: none; color: #895FAD; box-shadow: inset 0 0 0 2px #895FAD'};
  font-size: 1em;
  font-weight: 400;
  margin: 0.5em;
  padding: 0.7em 1em;
  border-radius: 8px;
  cursor: pointer;
  ${props => props.fullWidth && 'width: 100%; margin: .8em 0'};

  transition: all 300ms;

  :hover {
    ${props =>
    props.primary
      ? `box-shadow: 0 1em 1.5em -0.8em rgba(99, 59, 187, 0.1),
    0 0.6em 0.2em -0.5em rgba(0, 0, 0, 0.2), inset 0 0 1em 1.5em #9957AC`
      : `box-shadow: inset 0 0 0 3px #895fad`};
  }

  :active {
    box-shadow: none;
    color: ${props => (props.primary ? 'white' : '#895FAD')};
  }
`

export default Button
