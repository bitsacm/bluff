import React, { Component } from 'react';
import './modal.css';
import { Modal, ModalHeader, ModalBody } from 'shards-react';

class InstructionModal extends Component {
  render() {
    return(
      <Modal open = {this.props.modalVisible} toggle = {this.props.toggleModal}>
        <ModalHeader>Instructions</ModalHeader>
        <ModalBody>
          
        </ModalBody>
      </Modal>
    );
  }
}

export default InstructionModal;