import React, { Component } from 'react';
import { Form, FormInput, FormGroup, Button } from 'shards-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as joinCreators from '../../Store/Actions/join';


class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username: window.localStorage.getItem("userName"),
      roomCode: '',
      disableSubmit: false
    };
  }

  handleUsernameChange = (e) => {
    console.log(e.target.value);
    this.setState({
      username: e.target.value
    });
    window.localStorage.setItem("userName",e.target.value);
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
        <Form>
          <FormGroup>
            <label htmlFor="#username">Username</label>
            <FormInput 
              id="#username" 
              placeholder="Username" 
              autoComplete = "off"
              onChange = {this.handleUsernameChange} 
              value = {this.state.username}
              required/>
          </FormGroup>
          <FormGroup>
            <label htmlFor="#roomCode">Room Code</label>
            <FormInput id="#roomCode" 
              placeholder="Enter the room code" 
              onChange = {this.handleRoomChange}
              value = { this.state.roomCode }
              autoComplete = "off"
              required/>
          </FormGroup>
          <FormGroup>
            <Button disabled = {this.state.disableSubmit} type = "submit" onClick = {this.handleSubmit}>Play</Button>
          </FormGroup>
        </Form>
      );
    }
  }

  render() {
    return(
      <div className = "container">
        <div className = "row">
          <div className = "col-12">
            <this.Formie joined = {this.props.hasJoined} 
             error = {this.props.joinError} 
             isLoading = {this.props.joinLoading}/>
          </div>
        </div>
      </div>
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