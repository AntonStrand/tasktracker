import React from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(38, 16, 58, 0.7);
`

const Container = styled.div`
  background: #fdfdfd;
  box-shadow: 0 2px 4px 0 rgba(99, 59, 187, 0.04),
    0 5px 7px 0 rgba(0, 0, 0, 0.02), 0 2px 2px 0 rgba(0, 0, 0, 0);
  border-radius: 16px;
`

const Modal = ({ component: Component, ...rest }) => (
  <Overlay>
    <Container>
      <Component {...rest} />
    </Container>
  </Overlay>
)

export default Modal
