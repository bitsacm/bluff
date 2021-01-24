import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
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