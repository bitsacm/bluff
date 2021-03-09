import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import classnames from 'classnames';
import './actGame.css';
import { Modal, ModalHeader, ModalBody, FormSelect } from 'shards-react';
import { Link, Redirect } from 'react-router-dom';
import * as actionTypes from '../../Store/Actions/actionTypes';
import { suitConvert, rankConvert } from "../../cardGetter";
import Stack from "./cardStack";
import Prevent from "./preventComponent";
import MoveHistory from "./moveHistory/moveHistory"

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
      width: window.innerWidth
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let opponents;
    if (nextProps.gameState) {
      opponents = nextProps.gameState._state.playerList.filter((player) => player.name !== window.sessionStorage.getItem("userName"));
      if (nextProps.gameState._state.playerList.length === 2) {
        return {
          middleDeck: opponents[0],
          topLeftDeck: {name: undefined },
          topRightDeck: {name: undefined },
          bottomLeftDeck: {name: undefined },
          bottomRightDeck: {name: undefined }
        };
      }
      else if (nextProps.gameState._state.playerList.length === 3) {
        return {
          topLeftDeck: opponents[0],
          topRightDeck: opponents[1],
          bottomLeftDeck: {name: undefined },
          bottomRightDeck: {name: undefined },
          middleDeck: {name: undefined },
        };
      }
      else if (nextProps.gameState._state.playerList.length === 4) {
        return {
          middleDeck: opponents[0],
          bottomLeftDeck: opponents[1],
          bottomRightDeck: opponents[2],
          topLeftDeck: {name: undefined },
          topRightDeck: {name: undefined }
        };
      }
      else if (nextProps.gameState._state.playerList.length === 5) {
        return {
          topLeftDeck: opponents[0],
          topRightDeck: opponents[1],
          bottomLeftDeck: opponents[2],
          bottomRightDeck: opponents[3],
          middleDeck: {name: undefined }
        };
      }
      else if (nextProps.gameState._state.playerList.length === 6) {
        return {
          topLeftDeck: opponents[0],
          middleDeck: opponents[1],
          topRightDeck: opponents[2],
          bottomLeftDeck: opponents[3],
          bottomRightDeck: opponents[4]
        };
      }
    } else {
        this.props.winner = window.sessionStorage.getItem("userName")
        return {
          middleDeck: {name: undefined},
          topLeftDeck: {name: undefined },
          topRightDeck: {name: undefined },
          bottomLeftDeck: {name: undefined },
          bottomRightDeck: {name: undefined }
        }
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimension);
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = 'You would exit out of the game. Sure you wish to leave ?';
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimension);
    window.removeEventListener('beforeunload');
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
    console.log(this.props.gameState);
    console.log(this.props.hasJoined);
    console.log(this.state);
    console.log(images);
    if (this.props.hasJoined !== true) {
      return (
        <Redirect to="/" />
      );
    }
    //ok
    if (!this.state.widthOk) {
      return (
        <Prevent width={this.state.width} />
      );
    }
    return (
      <div className="game-bg">
        <div className="row">
          <div className="col-4 opponent-box">
            {this.state.topLeftDeck.name !== undefined ?
              <div>
                <div className="top-stack-container text-center" >
                  <Stack randomOrientation={false}
                    count={this.state.topLeftDeck.numberOfCards}
                    spread={4}
                    takeSpace={true}
                    shadow={true}
                  />
                </div>
                <p className="opponent-name">
                  {this.state.topLeftDeck.name}
                </p>
              </div>
              : <div />
            }
          </div>
          <div className="col-4 opponent-box">
            {this.state.middleDeck.name !== undefined ?
              <div>
                <div className="top-stack-container text-center" >
                  <Stack randomOrientation={false}
                    count={this.state.middleDeck.numberOfCards}
                    spread={4}
                    takeSpace={true}
                    shadow={true}
                  />
                </div>
                <p className="opponent-name pt-auto">
                  {this.state.middleDeck.name}
                </p>
              </div>
              : <div />
            }
          </div>
          <div className="col-4  opponent-box">
            {this.state.topRightDeck.name !== undefined ?
              <div>
                <div className="top-stack-container text-center" >
                  <Stack randomOrientation={false}
                    count={this.state.topRightDeck.numberOfCards}
                    spread={4}
                    takeSpace={true}
                    shadow={true}
                  />
                </div>
                <p className="opponent-name">
                  {this.state.topRightDeck.name}
                </p>
              </div>
              : <div />
            }
          </div>
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
                </p>
              </div>
              : <div />
            }
          </div>
          <div className="col-6">
            <div className="game-table mx-auto">
              <div className="game-table-card-box">
                <Stack count={this.props.gameState._state.totalCentralStackSize} shadow={false} randomOrientation={true} spread={0} takeSpace={false} />
              </div>
              <div className="rank-display text-center">
                <div className="rank-display-vertical">
                  <h3 className="rank-display-text">{this.props.gameState ? (this.props.gameState._state.currentRank) : ''}</h3>
                  <p className="rank-display-sub">{this.props.gameState._state.currentRank ? 'rank' : 'first turn'}</p>
                </div>
              </div>
            </div>
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
                {window.sessionStorage.getItem("userName") + "'s deck "}
                <span className=" your-table-turn">
                  {this.props.gameState && (window.sessionStorage.getItem("userName") === this.props.gameState._state.turn) ? "(Your turn)" : ""}
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
            <MoveHistory moves={this.props.gameState && (this.props.gameState._state.currentRound !== undefined) ? this.props.gameState._state.currentRound : undefined }/>
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
        <Modal open={this.state.modalVisible} toggle={this.toggleModal}>
          <ModalHeader>
            How will you play this one?
          </ModalHeader>
          <ModalBody>
            <FormSelect value={this.state.rankValue}
              onChange={this.handleRankChange} className="modal-select">
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
            <Button className="modal-button" onClick={() => { this.handleFirstTurn(this.props.gameState, this.props.userSocket); }} >End turn</Button>
          </ModalBody>
        </Modal>
        <Modal open={this.props.hasEnded}>
          <ModalHeader>Game has ended!</ModalHeader>
          <ModalBody>
            <p>{this.props.winner} is the bluff master</p>
            <Link to="/">
              <Button className="modal-button" onClick={() => { this.props.finish(); }} className="mt-2">Return to home</Button>
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
    winner: state.gameStatus.winner,
    hasJoined: state.joinStatus.joinedIn
  };
}

const mapDispatchtoProps = dispatch => {
  return {
    finish: () => { dispatch({ type: actionTypes.JOIN_TERMINATE }); }
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Game);