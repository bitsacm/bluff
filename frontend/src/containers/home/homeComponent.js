import React, { Component } from 'react';
import { Form, FormInput, FormGroup, Button } from 'shards-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as joinCreators from '../../Store/Actions/join';
import HomeLayout from './homeLayoutComponent';
import styled from 'styled-components';
import './home.css';

const FormWhole = styled.div`
  position: fixed;
  top: 50px;
  right: ${ props => props.widthOk ? '60px' : '50%'};
  ${props => props.widthOk ? '' : 'margin-right:' + (props.width < 450 ? '-45%' : '-200px') + ';'}
  width: ${props => props.width < 450 ? '90%' : '400px'};
  height: 350px;
  z-index: 4;
`
const Foot = styled.p`
  position: fixed;
  width: 200px;
  bottom: 0px;
  right: 50%;
  margin-right: -100px;
  text-align: center;
`

class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username: window.sessionStorage.getItem("userName"),
      roomCode: '',
      disableSubmit: false,
      widthOk: (window.innerWidth >= 650 && window.innerWidth <= 900),
      width: window.innerWidth
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimension);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimension);
  }

  updateDimension = () => {
    this.setState({
      width: window.innerWidth
    });
    if(window.innerWidth >= 650 && window.innerWidth <= 900) {
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

  handleUsernameChange = (e) => {
    console.log(e.target.value);
    this.setState({
      username: e.target.value
    });
    window.sessionStorage.setItem("userName",e.target.value);
  };

  handleRoomChange = (e) => {
    console.log(e.target.value);
    this.setState({
      roomCode: e.target.value
    });
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    this.setState({
      disableSubmit: true
    });
    const username = this.state.username.trim().toLowerCase();
    const roomcode = this.state.roomCode.trim().toLowerCase();
    this.props.joinGame(username, roomcode);
  }

  Formie = ({joined, error, isLoading}) => {
    console.log(error);
    if(joined) {
      return(
        <Redirect to = "/lobby" />
      );
    }
    else {
      if(isLoading) {
        return(
          <h5>loading</h5>
        );
      }
      if(error) {
        alert("Error");
      }
      return(
        <Form className = "join-form">
          <FormGroup>
            <label className = "join-label" htmlFor="#username">Nick</label>
            <FormInput 
              id="#username" 
              placeholder="What's your name" 
              autoComplete = "off"
              onChange = {this.handleUsernameChange} 
              value = {this.state.username}
              required/>
          </FormGroup>
          <FormGroup>
            <label className = "join-label" htmlFor="#roomCode">Room Code</label>
            <FormInput id="#roomCode" 
              placeholder="" 
              onChange = {this.handleRoomChange}
              value = { this.state.roomCode }
              autoComplete = "off"
              required/>
          </FormGroup>
          <FormGroup>
            <Button className = "join-play-button" disabled = {this.state.disableSubmit || !this.state.widthOk} type = "submit" onClick = {this.handleSubmit}>Join the room</Button>
          </FormGroup>
        </Form>
      );
    }
  }

  render() {
    return(
      <HomeLayout>
        <FormWhole widthOk = {this.state.widthOk} width = {this.state.width}>
          <h1 className = "join-header">Bluff</h1>
          <this.Formie  joined = {this.props.hasJoined} 
                        error = {this.props.joinError} 
                        isLoading = {this.props.joinLoading}/>
          <p className = "join-imp-info">It is recommended to play the game on meet with friends, splitting laptop screen in half.
          Game won’t trigger until required dimensions are set.<br/>
          <span className = "join-imp-highlight">Current width :</span>  {this.state.width}px<br/>
          <span className = "join-imp-highlight">Width range allowed :</span> 650-900px</p>
        </FormWhole>
        <Foot>A project by BITS-ACM</Foot>
      </HomeLayout>
    );
  }
}

const mapStatetoProps = state => {
  return {
    hasJoined: state.joinStatus.joinedIn,
    joinError: state.joinStatus.error,
    joinLoading: state.joinStatus.loading
  };
}

const mapDispatchtoProps = dispatch => {
  return {
    joinGame: (userName, roomCode) => dispatch(joinCreators.join(userName, roomCode))
  }
}

export default connect( mapStatetoProps, mapDispatchtoProps )(Home);