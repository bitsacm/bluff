import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'shards-react';
import { Link } from 'react-router-dom';

class EndModal extends Component {
  
  render() {
    return(
      <Modal open={this.props.hasEnded}>
        <ModalHeader>Game has ended!</ModalHeader>
        <ModalBody>
          <p>{this.props.winner} is the bluff master</p>
          <Button className="modal-button mt-2" onClick={() => { this.props.finish(); }}>Return to home</Button>
        </ModalBody>
      </Modal>
    );
  }
}

export default EndModal;