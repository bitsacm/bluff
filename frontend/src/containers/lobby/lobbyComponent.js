import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as startCreators from '../../Store/Actions/start';
import { io } from 'socket.io-client';
import { Button } from 'shards-react';
import { rankIndex, suitIndex } from '../../cardsBoilerPlate';
import * as actiontypes from '../../Store/Actions/actionTypes';

class Lobby extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      playerList: []
    }
  }

  async componentDidMount() {
    console.log("inside did mount");
    const socket = this.props.userSocket;
    socket.on('start', () => {
      this.props.startGameFromBack();
    });

    socket.on('update-game-state', (state, cards) => {
      cards.sort((a,b) => {
        if (rankIndex[a.rank.shortName] < rankIndex[b.rank.shortName] ||
           (rankIndex[a.rank.shortName] === rankIndex[b.rank.shortName] &&
             suitIndex[a.suit.name] < suitIndex[b.suit.name])) {
          return -1;
        }
        return 1;
      });
      console.log("recieved game state, pushing to redux store", state, cards);
      this.props.updateGameState(state, cards);
    });
  }
  
  Start = ({hasStarted, error, loading}) => {
    if(hasStarted) {
      return(
        <Redirect to = "/game" />
      );
    }
    else {
      if(loading) {
        return(
          <h5>Loading..</h5>
        );
      }
      if(error) {
        alert("Error");
      }
      const Socket = this.props.userSocket;
      return(
        <div>
          <ul>
            {this.props.gameFetched ? 
              this.props.gameState.playerList.map((player) => {
                return(
                  <h4>{player.name}</h4>
                );
              })
            : <br/>}
          </ul>
          <Button onClick = {() => { this.props.startGame(Socket); }}>Start the game</Button>
        </div>
      );
    }
  }
  
  render() {
    return(
      <this.Start hasStarted = {this.props.hasStarted} 
       error = {this.props.startError} 
       loading = {this.props.startLoading} />
    );
  }
}

const mapStatetoProps = state => {
  return {
    hasStarted: state.startStatus.started,
    startError: state.startStatus.error,
    startLoading: state.startStatus.loading,
    gameState: state.gameStatus.gameData,
    gameFetched: state.gameStatus.gameFetched,
    userSocket: state.joinStatus.socket
  };
}

const mapDispatchtoProps = dispatch => {
  return {
    startGame: (Socket) => dispatch(startCreators.start(Socket)),
    startGameFromBack: () => dispatch(startCreators.startSuccess()),
    updateGameState: (state, cards) => dispatch({type: actiontypes.UPDATE_GAME_SUCCESS, payload: { state, cards }})
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Lobby);