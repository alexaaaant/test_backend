import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import FormComponent from "../Form/Form"

const NodeCreationWindow = (props) => {
  return (
    <Modal isOpen>
      <ModalHeader toggle={props.cancelChange}>
        Новый узел
        </ModalHeader>
      <ModalBody>
        <FormComponent {...props} />
      </ModalBody>

    </Modal>
  )
}


export default NodeCreationWindow