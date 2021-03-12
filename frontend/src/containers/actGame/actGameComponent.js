import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import classnames from 'classnames';
import './actGame.css';
import { Redirect } from 'react-router-dom';
import * as actionTypes from '../../Store/Actions/actionTypes';
import { suitConvert, rankConvert } from "../../cardGetter";
import Stack from "./cardStack";
import Prevent from "./preventComponent";
import MoveHistory from "./move-history/moveHistComponent";
import RankModal from "./rankModal/rankModalComponent";
import EndModal from "./endModal/endModalComponent";
import GameTable from "./gameTable/gameTableComponent";
import Opponent from "./topOpponent/opponentComponent";

const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

const images = importAll(require.context('../../assets/Cards', false, /\.(png|jpe?g|svg)$/));

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entireState: {},
      topLeftDeck: {},
      middleDeck: {},
      topRightDeck: {},
      bottomLeftDeck: {},
      bottomRightDeck: {},
      selectedCards: new Set(),
      modalVisible: false,
      rankValue: "2",
      widthOk: (window.innerWidth >= 650 && window.innerWidth <= 900),
      width: window.innerWidth,
      confirmPrompt: true
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let opponents;
    if (nextProps.gameState && nextProps.gameState._state) {
      opponents = nextProps.gameState._state.playerList.filter((player) => player.name !== window.sessionStorage.getItem("userName"));
      if (nextProps.gameState._state.playerList.length === 1) {

      }
      else if (nextProps.gameState._state.playerList.length === 2) {
        return {
          middleDeck: opponents[0]
        };
      }
      else if (nextProps.gameState._state.playerList.length === 3) {
        return {
          topLeftDeck: opponents[0],
          topRightDeck: opponents[1]
        };
      }
      else if (nextProps.gameState._state.playerList.length === 4) {
        return {
          middleDeck: opponents[0],
          bottomLeftDeck: opponents[1],
          bottomRightDeck: opponents[2]
        };
      }
      else if (nextProps.gameState._state.playerList.length === 5) {
        return {
          topLeftDeck: opponents[0],
          topRightDeck: opponents[1],
          bottomLeftDeck: opponents[2],
          bottomRightDeck: opponents[3]
        };
      }
      else {
        return {
          topLeftDeck: opponents[0],
          middleDeck: opponents[1],
          topRightDeck: opponents[2],
          bottomLeftDeck: opponents[3],
          bottomRightDeck: opponents[4]
        };
      }
    }
    return null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimension);
    window.addEventListener('beforeunload', function (e) {
      console.log(this.state.confirmPrompt);
      if(this.state.confirmPrompt) {
        e.preventDefault();
        e.returnValue = 'You would exit out of the game. Sure you wish to leave ?';
        this.setState({
          confirmPrompt: true
        });
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimension);
    window.removeEventListener('beforeunload', function (e) {
      console.log(this.state.confirmPrompt);
      if(this.state.confirmPrompt) {
        e.preventDefault();
        e.returnValue = 'You would exit out of the game. Sure you wish to leave ?';
        this.setState({
          confirmPrompt: true
        });
      }
    });
  }

  updateDimension = () => {
    this.setState({
      width: window.innerWidth
    });
    if (window.innerWidth >= 650 && window.innerWidth <= 900) {
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

  handleBluff = (Socket) => {
    Socket.emit('call-bluff', (error) => {
      if (error) {
        alert(error)
      } else {
        if (this.state.selectedCards.size !== 0) {
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
    if (this.state.selectedCards.size === 0) {
      socket.emit('pass', (error) => {
        if (error) {
          alert(error);
        }
      });
    }
    else {
      const cards = game._cards.filter((card) => this.state.selectedCards.has(card.id));
      if (game._state.firstTurn) {
        this.setState({
          modalVisible: true
        });
      }
      else {
        socket.emit('turn', cards, null, (error) => {
          if (error) {
            alert(error);
          }
          else {
            if (this.state.selectedCards.size !== 0) {
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
      if (error) {
        alert(error);
      }
      else {
        if (this.state.selectedCards.size !== 0) {
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
    if (this.state.selectedCards.size === 0) {
      newDeck = new Set();
      newDeck.add(id);
      this.setState({
        selectedCards: newDeck
      });
    }
    else {
      newDeck = new Set(this.state.selectedCards);
      if (this.state.selectedCards.has(id)) {
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
    if (this.props.hasJoined === false) {
      return (
        <Redirect to="/" />
      );
    }
    if (!this.state.widthOk) {
      return (
        <Prevent width={this.state.width} />
      );
    }
    return (
      <div className="game-bg">
        <div className="row">
          <Opponent deck = {this.state.topLeftDeck} current = {this.props.gameState._state.turn} /> 
          <Opponent deck = {this.state.middleDeck} current = {this.props.gameState._state.turn} /> 
          <Opponent deck = {this.state.topRightDeck} current = {this.props.gameState._state.turn} /> 
        </div>
        <div className="row">
          <div className="col-3 opponent-box text-left">
            {this.state.bottomLeftDeck.name !== undefined ?
              <div>
                <div className="left-stack-container text-center" >
                  <Stack randomOrientation={false}
                    count={this.state.bottomLeftDeck.numberOfCards}
                    spread={4}
                    takeSpace={true}
                    shadow={true}
                  />
                </div>
                <p className="opponent-name text-left ml-2">
                  {this.state.bottomLeftDeck.name}
                  <span className="opponent-card-num">{ this.props.gameState._state.turn === this.state.bottomLeftDeck.name ? '\'s turn' : ''}</span>
                </p>
              </div>
              : <div />
            }
          </div>
          <div className="col-6">
            <GameTable gameState = {this.props.gameState} />
          </div>
          <div className="col-3  opponent-box text-right">
            {this.state.bottomRightDeck.name !== undefined ?
              <div>
                <div className="right-stack-container text-right">
                  <Stack randomOrientation={false}
                    count={this.state.bottomRightDeck.numberOfCards}
                    spread={4}
                    takeSpace={true}
                    shadow={true}
                  />
                </div>
                <p className="opponent-name text-right mr-2">
                  {this.state.bottomRightDeck.name}
                  <span className="opponent-card-num">{ this.props.gameState._state.turn === this.state.bottomRightDeck.name ? '\'s turn' : ''}</span>
                </p>
              </div>
              : <div />
            }
          </div>
        </div>
        <div className="mt-3 player-row d-flex">
          <div className="col-8 your-column">
            <div className="your-table">
              <h4 className="your-table-heading pt-2">
                {window.sessionStorage.getItem("userName") + "'s deck (" + this.props.gameState._cards.length + ")"}
                <span className=" your-table-turn">
                  {this.props.gameState && (window.sessionStorage.getItem("userName") === this.props.gameState._state.turn) ? " Your turn" : ""}
                </span>
              </h4>
              <div className="card-container">
                <div className="card-row px-4 pb-3">
                  {this.props.gameState ?
                    this.props.gameState._cards.map((card) => {
                      const isLit = this.state.selectedCards.has(card.id);
                      console.log(suitConvert.get(card.suit.name));
                      return (
                        <div className={classnames('card-holder pt-3', { 'active-card-holder': isLit })}>
                          <img src={images[`${suitConvert.get(card.suit.name)}${rankConvert.get(card.rank.shortName)}.svg`].default}
                            alt={card.suit.name}
                            onClick={() => { this.toggleCard(card.id); }}
                            className={classnames('game-card', { 'active-card': isLit })}
                          />
                        </div>
                      );
                    })
                    : <div />}
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 info-column">
            <MoveHistory gameState = {this.props.gameState} />
            <Button
              disabled={!this.props.gameState || this.props.userName !== this.props.gameState._state.turn || (this.props.gameState._state.firstTurn && this.state.selectedCards.size === 0)}
              className="game-button"
              onClick={() => { this.handlePlay(this.props.gameState, this.props.userSocket); }}>
              {this.state.selectedCards.size === 0 ? 'Pass' : 'Play selected cards'}
            </Button>
            <Button
              disabled={!this.props.gameState || this.props.userName !== this.props.gameState._state.turn || this.props.gameState._state.firstTurn}
              className="game-button"
              onClick={() => { this.handleBluff(this.props.userSocket); }}>Call Bluff</Button>
          </div>
        </div>
        <RankModal modalVisible = {this.state.modalVisible} 
         toggleModal = {this.toggleModal} 
         clicked = { () => { this.handleFirstTurn(this.props.gameState, this.props.userSocket); } }/>
        <EndModal hasEnded = {this.props.hasEnded} 
         winner = {this.props.winner}
         finish = {() => { this.setState({ confirmPrompt: false}); this.props.finish(); }} />
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
    winner: state.gameStatus.winner,
    hasJoined: state.joinStatus.joinedIn
  };
}

const mapDispatchtoProps = dispatch => {
  return {
    finish: () => { dispatch({ type: actionTypes.JOIN_TERMINATE });}
  };
}


export default connect(mapStatetoProps, mapDispatchtoProps)(Game);