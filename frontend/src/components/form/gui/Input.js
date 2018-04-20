import styled from 'styled-components'

const Input = styled.input`
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 0.7em 1em;
  margin: 0.25em 0;
  color: ${props => (props.error ? '#B42C5D' : '#6D5584')};
  background: ${props => (props.error ? '#FAF4F6' : '#efedf1')};
  box-shadow: ${props => (props.error ? 'inset 0 0 0 1px #D88EA9' : 'none')};
  border: ${props => (props.error ? '#db7777' : 'none')};
  border-radius: 6px;
  font-size: 1em;
  display: inline-block;
  box-sizing: border-box;
  width: 100%;

  &:focus {
    box-shadow: inset 0 0 0 1px
      ${props => (props.error ? '#D88EA9' : '#A189B6')};
    border: ${props => (props.error ? '#db7777' : '#A189B6')};
  }

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${props => (props.error ? '#D08BA4' : '#a491b7')};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${props => (props.error ? '#D08BA4' : '#a491b7')};
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${props => (props.error ? '#D08BA4' : '#a491b7')};
  }
`

export default Input
