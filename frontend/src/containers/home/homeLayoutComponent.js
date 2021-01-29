import React, { Component } from 'react';
import styled from 'styled-components';
import card1 from '../../assets/Cards/DIAMOND-9.svg';
import card2 from '../../assets/bluff card inverse.png';
import card3 from '../../assets/Cards/CLUB-1.svg';
import card4 from '../../assets/Cards/HEART-11-JACK.svg';
import card6 from '../../assets/Cards/SPADE-7.svg';

const Bg = styled.div`
  height: 100vh;
  overflow-y: hidden;
  background-color: #E8E8E8 !important;
  z-index: -50;
`
const CardBox = styled.div`
  position: relative;
  height: 0 !important;
  width: 0 !important;
`
const CardFixed = styled.img`
  position: fixed;
  bottom: 0;
  width: 180px;
  z-index: 1;
  transform: rotate(-25deg);
  right: -30px;
  @media (max-width: 650px) {
    opacity: 0;
  }
`
const CardOne = styled.img`
  position: absolute;
  width: 180px; 
  transform: rotate(20deg);
  left: -50px;
  top: -30px;
  z-index: 1;
  @media (max-width: 650px) {
    opacity: 0;
  }
`
const CardTwo = styled(CardOne)`
  transform: rotate(-20deg);
  z-index: 0;
  top: 50px;
  left: -30px;
`
const CardThree = styled(CardOne)`
  transform: rotate(80deg);
  top: 220px;
  left: -90px;
`
const CardFour = styled(CardOne)`
  z-index: 3;
  transform: rotate(-15deg);
  top: 370px;
`
const CardFive = styled(CardOne)`
  transform: rotate(45deg);
  top: 420px;
  left: 0px;
  z-index: 2;
`
const CardSix = styled(CardOne)`
  transform: rotate(70deg);
  top: 500px;
  left: 0px;
`

class HomeLayout extends Component {
  render() {
    return(
      <Bg>
        <CardBox>
          <CardOne src = {card1}></CardOne>
        </CardBox>
        <CardBox>
          <CardTwo src = {card2}></CardTwo>
        </CardBox>
        <CardBox>
          <CardThree src = {card3}></CardThree>
        </CardBox>
        <CardBox>
          <CardFour src = {card4}></CardFour>
        </CardBox>
        <CardBox>
          <CardFive src = {card2}></CardFive>
        </CardBox>
        <CardBox>
          <CardSix src = {card6}></CardSix>
        </CardBox>
          <CardFixed src = {card2}></CardFixed>
        {this.props.children}
      </Bg>
    );
  }
}

export default HomeLayout;