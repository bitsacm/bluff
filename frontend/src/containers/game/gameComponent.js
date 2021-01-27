import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import classnames from 'classnames';
import './game.css';
import { Modal, ModalHeader, ModalBody, FormSelect} from 'shards-react';
import { Link } from 'react-router-dom';
import * as actionTypes from '../../Store/Actions/actionTypes';

class Game extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedCards: new Set(),
      modalVisible: false,
      rankValue: "2"
    }
  }

  handleBluff = (Socket) => {
    Socket.emit('call-bluff', (error) => {
      if (error) {
        alert(error)
      } else {
        if(this.state.selectedCards.size !== 0) {
          let newDeck = new Set(this.state.selectedCards);
          newDeck.clear();
          this.setState({
            selectedCards: newDeck
          });
        }
      }
    })
  }

  handlePlay = (game, socket) => {
    if(this.state.selectedCards.size === 0) {
      socket.emit('pass', (error) => {
        if(error) {
          alert(error);
        }
      });
    }
    else {
      const cards = game._cards.filter((card) => this.state.selectedCards.has(card.id));
      if(game._state.firstTurn) {
        this.setState({
          modalVisible: true
        });
      }
      else {
        socket.emit('turn', cards, null, (error) => {
          if(error) {
            alert(error);
          }
          else {
            if(this.state.selectedCards.size !== 0) {
              let newDeck = new Set(this.state.selectedCards);
              newDeck.clear();
              this.setState({
                selectedCards: newDeck
              });
            }
          }
        })
      }
    }
  }

  handleFirstTurn = (game, socket) => {
    const cards = game._cards.filter((card) => this.state.selectedCards.has(card.id));
    socket.emit('turn', cards, this.state.rankValue, (error) => {
      if(error) {
        alert(error);
      }
      else {
        if(this.state.selectedCards.size !== 0) {
          let newDeck = new Set(this.state.selectedCards);
          newDeck.clear();
          this.setState({
            selectedCards: newDeck,
            modalVisible: false
          });
        }
      }
    })
  }

  handleRankChange = (event) => {
    console.log(event);
    this.setState({
      rankValue: event.target.value
    });
  }

  toggleCard = (id) => {
    console.log(this.state.selectedCards);
    let newDeck;
    if(this.state.selectedCards.size === 0) {
      newDeck = new Set();
      newDeck.add(id);
      this.setState({
        selectedCards: newDeck
      });
    }
    else {
      newDeck = new Set(this.state.selectedCards);
      if(this.state.selectedCards.has(id)) {
        newDeck.delete(id);
        this.setState({
          selectedCards: newDeck
        });
      }
      else {
        newDeck.add(id);
        this.setState({
          selectedCards: newDeck
        });
      }
    }
    console.log(newDeck);
  }

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }
  
  render() {
    console.log(this.props.gameState);
    return(
      <div className = "container">
        <div className = "row">
          <div className = "col-12">
            <ul>
              { this.props.gameState ? 
                this.props.gameState._state.playerList.map((player) => {
                  return(
                    <li>{player.name} - {player.numberOfCards}</li>
                  );
                })
              : <div/>}
            </ul>
          </div>
        </div>
        <div className = "row">
          <div className = "col-12">
            <h5>CentralStack: {this.props.gameState ? this.props.gameState._state.totalCentralStackSize : ''} 
             ({this.props.gameState ? this.props.gameState._state.lastTurnSize : ''})</h5>
            <h5>Rank: {this.props.gameState ? ( this.props.gameState._state.currentRank || 'First turn' ) : ''}</h5>
            <h5>Turn: {this.props.gameState ? this.props.gameState._state.turn : '' }</h5>
          </div>
        </div>
        <div className = "row">
          <div className = "col-12">
            <div className = "row">
              { this.props.gameState ? 
                this.props.gameState._cards.map((card) => {
                  const isLit = this.state.selectedCards.has(card.id);
                  return(
                    <Card onClick = { () => { this.toggleCard(card.id); } } 
                     className = { classnames( 'col-3 game-card', { 'active-card' : isLit })}>
                      <CardTitle>{card.rank.shortName}</CardTitle>
                      <CardBody>{card.suit.name}</CardBody>
                    </Card>
                  );
                })
              : <div/>}
            </div>
          </div>
        </div>
        <div className = "row my-4">
          <div className = "col-6">
            <Button  
            disabled = { !this.props.gameState || this.props.userName !== this.props.gameState._state.turn || this.props.gameState._state.firstTurn}
            className = "game-button"
            theme = "primary"
            onClick = { () => { this.handleBluff(this.props.userSocket); }}>Call Bluff</Button>
          </div>
          <div className = "col-6">
            <Button 
            disabled = { !this.props.gameState || this.props.userName !== this.props.gameState._state.turn }
            className = "game-button"
            onClick = { () => { this.handlePlay(this.props.gameState, this.props.userSocket); }}>
            { this.state.selectedCards.size === 0 ? 'Pass' : 'Play selected cards'}
            </Button>
          </div>
        </div>
        <Modal open={this.state.modalVisible} toggle={this.toggleModal}>
          <ModalHeader>How will you play this one?</ModalHeader>
          <ModalBody>
            <FormSelect value={this.state.rankValue} 
             onChange={this.handleRankChange}>
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
            <Button onClick = { () => { this.handleFirstTurn(this.props.gameState, this.props.userSocket); } } >End turn</Button>
          </ModalBody>
        </Modal>
        <Modal open={this.props.hasEnded}>
          <ModalHeader>Game has ended!</ModalHeader>
          <ModalBody>
            <p>{this.props.winner} is the bluff master</p>
            <Link to = "/">
              <Button onClick = { () => { this.props.finish(); } } className = "mt-2">Return to home</Button>
            </Link>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    gameState: state.gameStatus.gameData,
    userSocket: state.joinStatus.socket,
    userName: state.joinStatus.userName,
    hasEnded: state.gameStatus.hasEnded,
    winner: state.gameStatus.winner
  };
} 

const mapDispatchtoProps = dispatch => {
  return {
    finish: () => { dispatch({ type: actionTypes.JOIN_TERMINATE }); }
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Game);