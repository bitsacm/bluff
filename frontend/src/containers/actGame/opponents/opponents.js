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

class Opponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opponents: this.prop.opponents,
      topLeftDeck: {},
      middleDeck: {},
      topRightDeck: {},
      bottomLeftDeck: {},
      bottomRightDeck: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (this.state.opponents.length === 1) {
      return {
        middleDeck: this.state.opponents[0]
      };
    }
    else if (this.state.opponents.length === 2) {
      return {
        topLeftDeck: this.state.opponents[0],
        topRightDeck: this.state.opponents[1]
      };
    }
    else if (this.state.opponents.length === 3) {
      return {
        middleDeck: this.state.opponents[0],
        bottomLeftDeck: this.state.opponents[1],
        bottomRightDeck: this.state.opponents[2]
      };
    }
    else if (this.state.opponents.length === 4) {
      return {
        topLeftDeck: this.state.opponents[0],
        topRightDeck: this.state.opponents[1],
        bottomLeftDeck: this.state.opponents[2],
        bottomRightDeck: this.state.opponents[3]
      };
    }
    else {
      return {
        topLeftDeck: this.state.opponents[0],
        middleDeck: this.state.opponents[1],
        topRightDeck: this.state.opponents[2],
        bottomLeftDeck: this.state.opponents[3],
        bottomRightDeck: this.state.opponents[4]
      };
    }
  }

  render() {
    return (
      
    )
  }
}

export default Opponents;