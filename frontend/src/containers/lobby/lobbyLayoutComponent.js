import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import cardBack from '../../assets/bluff card inverse.png';
import card1 from '../../assets/Cards/CLUB-13-KING.svg';
import card2 from '../../assets/Cards/DIAMOND-8.svg';
import card3 from '../../assets/Cards/HEART-1.svg';

const Bg = styled.div`
  height: 100vh;
  max-height: 100vh;
  overflow: hidden !important;
  background-color: #E8E8E8 !important;
  z-index: -50;
`
const Floating = (deg, dist) => keyframes`
  from { transform: rotate(0deg) translateX(${dist}px) rotate(${deg}deg); }
  to   { transform: rotate(360deg) translateX(${dist}px) rotate(${deg - 360}deg); }
`
const CardBox = styled.div`
  position: absolute;
  right: 0;
  height: 0 !important;
  width: 0 !important;
`

const CardFixed = styled.img`
  position: fixed;
  bottom: 0;
  width: 180px;
  z-index: 1;
  transform: rotate(${ (props) => props.degree });
  left: -150px;
  @media (max-width: 650px) {
    opacity: 0;
    width: 0;
  }
  animation-name: ${ (props) => Floating(props.degree, props.dist) }; 
  animation-duration: ${props => props.time}s; 
  animation-iteration-count: infinite; 
  animation-timing-function: linear;
  transition: width 0.2s ease-in-out, opacity 0.5s ease-in-out;
  &:hover {
    width: 190px;
  }
`

const Card = styled.img`
  position: fixed;
  width: 180px; 
  transform:  rotate(${ (props) => props.degree });
  right: ${props => props.right}px;
  top: ${props => props.top}px;
  z-index: ${props => props.zindex};
  @media (max-width: 650px) {
    opacity: 0;
    width: 0;
  }
  animation-name:  ${ (props) => Floating(props.degree, props.dist) }; 
  animation-duration: ${props => props.time}s; 
  animation-iteration-count: infinite; 
  animation-timing-function: linear;
  transition: width 0.2s ease-in-out, opacity 0.5s ease-in-out;
  &:hover {
    width: 190px;
  }
`

const CardStack = styled.img`
  position: fixed;
  width: 180px; 
  right: ${props => props.right}px;
  top: 100vh;
  margin-top: -180px;
  z-index: ${props => props.zindex};
  @media (max-width: 650px) {
    opacity: 0;
    width: 0;
  }
  animation-name:  ${ (props) => Floating(0, props.dist) }; 
  animation-duration: ${props => props.time}s; 
  animation-iteration-count: infinite; 
  animation-timing-function: linear;
  transition: width 0.2s ease-in-out, opacity 0.5s ease-in-out;
  &:hover {
    width: 190px;
  }
`

class LobbyLayout extends Component {
  render() {
    return(
      <Bg>
        <CardBox>
          <Card src = {cardBack} 
           dist = {3} 
           degree = {-40} 
           time = {2}
           top = {70}
           right = {-30}
           zindex = {1}></Card>
        </CardBox>
        <CardBox>
          <Card src = {card1} 
           dist = {3} 
           degree = {-60} 
           time = {2}
           top = {120}
           right = {-10}
           zindex = {2}></Card>
        </CardBox>
        <CardBox>
          <Card src = {card2} 
           dist = {3} 
           degree = {-85} 
           time = {2}
           top = {180}
           right = {-10}
           zindex = {3}></Card> 
        </CardBox>
        <CardBox>
          <Card src = {card3} 
           dist = {3} 
           degree = {-110} 
           time = {2}
           top = {230}
           right = {-60}
           zindex = {4}></Card>
        </CardBox>
        <CardBox>
          <CardStack src = {cardBack}
           dist = {3}
           time = {3}
           zindex = {1}
           right = {300}
           >
          </CardStack>
        </CardBox>
        <CardBox>
          <CardStack src = {cardBack}
           dist = {3}
           time = {3}
           zindex = {2}
           right = {280}
           >
          </CardStack>
        </CardBox>
        <CardBox>
          <CardStack src = {cardBack}
           dist = {3}
           time = {3}
           zindex = {3}
           right = {260}
           >
          </CardStack>
        </CardBox>
        <CardBox>
          <CardStack src = {cardBack}
           dist = {3}
           time = {3}
           zindex = {4}
           right = {240}
           >
          </CardStack>
        </CardBox>
        <CardBox>
          <CardStack src = {cardBack}
           dist = {3}
           time = {3}
           zindex = {5}
           right = {220}
           >
          </CardStack>
        </CardBox>
        <CardBox>
          <CardStack src = {cardBack}
           dist = {3}
           time = {3}
           zindex = {6}
           right = {200}
           >
          </CardStack>
        </CardBox>
        <CardFixed src = {cardBack}
           dist = {5} 
           degree = {-25} 
           time = {3.5}
          ></CardFixed>
        {this.props.children}
      </Bg>
    );
  }
}

export default LobbyLayout;