import React, { Component } from 'react';
import cardBack from "../../assets/bluff card inverse.png";
import styled from 'styled-components';

const Card = styled.img`
  width: 100px;
  position: absolute;
  transform: rotate(${ (props) => props.rotation}deg);
  box-shadow: 1px 2px 1px -1px rgba(0,0,0,0.1);
-webkit-box-shadow: 1px 2px 1px -1px rgba(0,0,0,0.1);
-moz-box-shadow: 1px 2px 1px -1px rgba(0,0,0,0.1);
  z-index: ${ (props) => props.zindex};
  left: ${ (props) => props.spread }px;
`

class Stack extends Component {
  
  render() {
    const cards = [];
    let spread = 0;
    let zindex = 50;
    for(let i = 0; i < this.props.count; i++, spread+= this.props.spread, zindex--) {
      cards.push(<Card rotation = { this.props.randomOrientation ? Math.floor(Math.random()*360) : 0} src = {cardBack} spread = {spread} zindex = {zindex}/>);
    }
    console.log(cards);
    return(
      <div>
        {cards}
      </div>
    );
  }

}

export default Stack;