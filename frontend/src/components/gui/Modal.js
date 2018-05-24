import React from 'react'
import ModalBase from 'react-responsive-modal'
import PropTypes from 'prop-types'

const Modal = ({ children, ...rest }) => (
  <ModalBase
    {...rest}
    center
    classNames={{ modal: 'modal', overlay: 'modal-overlay' }}
  >
    {children}
  </ModalBase>
)

Modal.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Modal
