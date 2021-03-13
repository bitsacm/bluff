import React, { Component } from 'react';
import './modal.css';
import { Modal, ModalHeader, ModalBody } from 'shards-react';

class InstructionModal extends Component {
  render() {
    return(
      <Modal open = {this.props.modalVisible} toggle = {this.props.toggleModal}>
        <ModalHeader>Instructions</ModalHeader>
        <ModalBody>
          The goal is simple, get rid of all your cards, by hook or crook. 
          <br/>
          Careful there, for you might get caught.
          <br/>
          Each round begins with someone picking a rank, say Ace or 10 or whatever pleases them. Now you shall add cards of the same rank (or claim to have done so) or you could just pass.
          <br/>
          If you feel the last person might is bluffing, you shall call thier bluff and the liar gets all the cards on the table (or you do for the lack of judgement 🙂).
          <br/>
          The first one to lose all their cards shall be the Bluffmaster.
        </ModalBody>
      </Modal>
    );
  }
}

export default InstructionModal;
