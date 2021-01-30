import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
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
const Floating = (deg, dist) => keyframes`
  from { transform: rotate(0deg) translateX(${dist}px) rotate(${deg}deg); }
  to   { transform: rotate(360deg) translateX(${dist}px) rotate(${deg - 360}deg); }
`
const CardFixed = styled.img`
  position: fixed;
  bottom: 0;
  width: 180px;
  z-index: 1;
  transform: rotate(${ (props) => props.degree });
  right: -30px;
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
  position: absolute;
  width: 180px; 
  transform:  rotate(${ (props) => props.degree });
  left: ${props => props.left}px;
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

class HomeLayout extends Component {
  render() {
    return(
      <Bg>
        <CardBox>
          <Card src = {card1} 
           dist = {3} 
           degree = {20} 
           time = {2}
           top = {-50}
           left = {-30}
           zindex = {1}></Card>
        </CardBox>
        <CardBox>
          <Card src = {card2}
           dist = {4} 
           degree = {-20} 
           time = {3}
           top = {50}
           left = {-30}
           zindex = {0}></Card>
        </CardBox>
        <CardBox>
          <Card src = {card3}
           dist = {3} 
           degree = {80} 
           time = {3.5}
           top = {220}
           left = {-90}
           zindex = {1}></Card>
        </CardBox>
        <CardBox>
          <Card src = {card4}
           dist = {5} 
           degree = {-15} 
           time = {4}
           top = {370}
           left = {-50}
           zindex = {3}></Card>
        </CardBox>
        <CardBox>
          <Card src = {card2}
           dist = {2} 
           degree = {45} 
           time = {2.5}
           top = {420}
           left = {0}
           zindex = {2}></Card>
        </CardBox>
        <CardBox>
          <Card src = {card6}
           dist = {6} 
           degree = {70} 
           time = {5}
           top = {500}
           left = {0}
           zindex = {1}></Card>
        </CardBox>
          <CardFixed src = {card2}
           dist = {5} 
           degree = {-25} 
           time = {3.5}
          ></CardFixed>
        {this.props.children}
      </Bg>
    );
  }
}

export default HomeLayout;