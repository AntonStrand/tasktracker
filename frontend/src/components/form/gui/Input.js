import styled from 'styled-components'

const Input = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 1em;
  margin: 0.25em 0;
  color: palevioletred;
  background: #efefef;
  box-shadow: ${props => (props.error ? 'inset 0 0 0 2px #db7777' : 'none')};
  border: ${props => (props.error ? '#db7777' : 'none')};
  border-radius: 3px;
  font-size: 1em;
  display: inline-block;
  box-sizing: border-box;
  width: 100%
  &:focus {
    background: #eff1f1;
  }
`

export default Input
