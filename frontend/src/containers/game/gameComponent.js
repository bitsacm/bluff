import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle } from 'reactstrap';
import classnames from 'classnames';
import './game.css';

class Game extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedCards: new Set()
    }
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
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    gameState: state.gameStatus.gameData,
    userSocket: state.joinStatus.socket
  };
} 

export default connect(mapStatetoProps)(Game);