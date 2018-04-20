import styled from 'styled-components'

// const Button = styled.button`
//   /* Adapt the colours based on primary prop */
//   background: ${props => (props.primary ? '#895FAD' : 'white')};
//   color: ${props => (props.primary ? 'white' : '#895FAD')};
//   font-size: 1em;
//   font-weight: 600;
//   margin: 0.5em;
//   padding: 0.8em 1em;
//   border: 2px solid #895fad;
//   border-radius: 6px;
//   cursor: pointer;
//   ${props => props.fullWidth && 'width: 100%; margin: .8em 0'};
//   box-shadow: none;
//   transition: all 300ms;

//   :hover {
//     //
//     // props.primary
//     //   ? // ? 'box-shadow: 0 1em 1em -0.8em rgba(99, 59, 187, 0.1), 0 0.6em 0.2em -0.5em rgba(0, 0, 0, 0.3)'
//     //   'background: #B18ECE; color: white'
//     //   : 'background: #895FAD; color: white'};

//     background: #b18ece;
//     border: 2px solid #b18ece;
//     color: white;
//   }
// `
const Button = styled.button`
  outline: none;
  /* Adapt the colours based on primary prop */
  ${props =>
    props.primary
      ? 'background: #895FAD; background-image: linear-gradient(22deg, #733AAE 0%, #9957AC 100%); color: white'
      : 'background: white; color: #895FAD'};
  font-size: 1em;
  font-weight: 600;
  margin: 0.5em;
  padding: 0.7em 1em;
  // border: 2px solid #895fad;
  border-radius: 8px;
  cursor: pointer;
  ${props => props.fullWidth && 'width: 100%; margin: .8em 0'};
  box-shadow: none;
  transition: all 300ms;

  :hover {
    //
    // props.primary
    //   ? // ? 'box-shadow: 0 1em 1em -0.8em rgba(99, 59, 187, 0.1), 0 0.6em 0.2em -0.5em rgba(0, 0, 0, 0.3)'
    //   'background: #B18ECE; color: white'
    //   : 'background: #895FAD; color: white'};

    box-shadow: 0 1em 1.5em -0.8em rgba(99, 59, 187, 0.1),
      0 0.6em 0.2em -0.5em rgba(0, 0, 0, 0.2),
      inset 0 0 1em 1.5em rgba(153, 87, 172, 1);
    color: white;
  }
  // :focus {
  //   box-shadow: 0 1em 1.5em -0.8em rgba(99, 59, 187, 0.1),
  //     0 0.6em 0.2em -0.5em rgba(0, 0, 0, 0.2),
  //     inset 0 0 1em 1.5em rgba(255, 255, 255, 0.15);
  // }
  :active {
    box-shadow: none;
    color: ${props => (props.primary ? 'white' : '#895FAD')};
  }
`

export default Button
