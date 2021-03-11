import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, FormSelect, Button } from 'shards-react';

class RankModal extends Component {
  
  render() {
    return(
      <Modal open={this.props.modalVisible} toggle={this.props.toggleModal}>
        <ModalHeader>
          How will you play this one?
        </ModalHeader>
        <ModalBody>
          <FormSelect value={this.props.rankValue}
            onChange={this.props.handleRankChange} className="modal-select">
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="J">Jack</option>
            <option value="Q">Queen</option>
            <option value="K">King</option>
            <option value="A">Ace</option>
          </FormSelect>
          <Button className="modal-button" onClick={this.props.clicked} >End turn</Button>
        </ModalBody>
      </Modal>
    )
  }
}

export default RankModal;
