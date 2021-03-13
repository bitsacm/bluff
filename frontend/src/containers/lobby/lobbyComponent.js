import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as startCreators from '../../Store/Actions/start';
import { Button } from 'shards-react';
import LobbyLayout from './lobbyLayoutComponent';
import Prevent from '../actGame/preventComponent';
import styled from 'styled-components';
import "./lobby.css";
import { Link } from 'react-router-dom';
import * as actionTypes from '../../Store/Actions/actionTypes'; 

const LobbyWhole = styled.div`
  position: fixed;
  top: 50px;
  left: ${ props => props.widthOk ? '60px' : '50%'};
  ${props => props.widthOk ? '' : 'margin-left:' + (props.width < 450 ? '-45%' : '-200px') + ';'}
  width: ${props => props.width < 450 ? '90%' : '400px'};
  height: 350px;
  z-index: 6;
`

class Lobby extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      playerList: [],
      widthOk: (window.innerWidth >= 600 && window.innerWidth <= 950),
      width: window.innerWidth
    }
  }

  Start = ({hasStarted, error, loading}) => {
    if(hasStarted) {
      return(
        <Redirect to = "/game" />
      );
    }
    else{
      if(loading) {
        return(
          <h5>Loading..</h5>
        );
      }
      if(error) {
        alert("Error");
      }
      const Socket = this.props.userSocket;
      console.log(this.props.gameState);
      return(
        <div>
          <h5 className = "lobby-room-label">Room code</h5>
          <h1 className = "join-header">{this.props.gameState._state.room}</h1>
          <div className = "join-form mt-4">
            <h5 className = "lobby-playerbox-label mt-2">Players at present :</h5>
            {this.props.gameFetched ? 
              this.props.gameState.state.playerList.map((player) => {
                return(
                  <h3 className = "lobby-player-names">{player.name}</h3>
                );
              })
            : <br/>}
            <Button 
              disabled = { this.props.gameState.state.playerList.length < 2 || this.props.gameState.state.playerList.length > 6}
              className = "join-play-button mt-3" 
              onClick = {() => {  window.sessionStorage.setItem("inGame", "1"); this.props.startGame(Socket); }}>Start the game</Button>
            <Link to = '/'>
              <Button className = "join-white-play-button mt-2" onClick = { this.props.finish }>Leave the lobby</Button>
            </Link>
          </div>
        </div>
      );
    }
  }

  updateDimension = () => {
    this.setState({
      width: window.innerWidth
    });
    if(window.innerWidth >= 600 && window.innerWidth <= 950) {
      this.setState({
        widthOk: true 
      });
    }
    else {
      this.setState({
        widthOk: false
      })
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimension);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimension);
  }
  
  render() {
    if(this.props.hasJoined === false) {
      return(
        <Redirect to = "/" />
      );
    }
    if(!this.state.widthOk) {
      return(
        <Prevent width={this.state.width} />
      );
    }
    return(
      <LobbyLayout>
        <LobbyWhole widthOk = {this.state.widthOk} width = {this.state.width}>
          <this.Start hasStarted = {this.props.hasStarted} 
          error = {this.props.startError} 
          loading = {this.props.startLoading} />
        </LobbyWhole>
      </LobbyLayout>
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
    userSocket: state.joinStatus.socket,
    hasJoined: state.joinStatus.joinedIn
  };
}

const mapDispatchtoProps = dispatch => {
  return {
    startGame: (Socket) => dispatch(startCreators.start(Socket)),
    startGameFromBack: () => dispatch(startCreators.startSuccess()),
    finish: () => { dispatch({ type: actionTypes.JOIN_TERMINATE }); }
    // updateGameState: (state, cards) => dispatch({type: actiontypes.UPDATE_GAME_SUCCESS, payload: { state, cards }})
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Lobby);