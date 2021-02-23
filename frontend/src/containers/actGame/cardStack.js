import React, { Component } from 'react';
import cardBack from "../../assets/bluff card inverse.png";
import styled from 'styled-components';

const Card = styled.img`
  width: 100px;
  position: absolute;
  transform: rotate(${ (props) => props.rotation}deg);
  border-color: #E8e8e8 !important;
  ${ (props) => props.shadow ? 'box-shadow: -2px 0px 0px 0px rgba(220,220,220,0.5); -webkit-box-shadow: -2px 0px 0px 0px rgba(220,220,220,0.5); -moz-box-shadow: -2px 0px 0px 0px rgba(220,220,220,0.5);' : ''}  
  z-index: ${ (props) => props.zindex};
  left: ${ (props) => props.spread }px;
`

const Cont = styled.div`
  width: ${ (props) => props.width }px;
  height: ${ (props) => props.height }px;
  position: relative;
  display: inline-block;
  text-align: left;
`

class Stack extends Component {
  
  render() {
    const cards = [];
    let spread = 0;
    let zindex = 0;
    let width = 100;
    for(let i = 0; i < this.props.count; i++, spread+= this.props.spread, zindex++) {
      cards.push(<Card rotation = { this.props.randomOrientation ? Math.floor(Math.random()*360) : 0} shadow = {this.props.shadow} src = {cardBack} spread = {spread} zindex = {zindex}/>);
    }
    width += spread;
    console.log(cards);
    return(
      <Cont height = {this.props.takeSpace ? 147 : 0} width = {width}>
        {cards}
      </Cont>
    );
  }

}

export default Stack;