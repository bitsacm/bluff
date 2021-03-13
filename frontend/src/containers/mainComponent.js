import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Home from "./home/homeComponent";
import Lobby from "./lobby/lobbyComponent";
import ActGame from "./actGame/actGameComponent";

class Main extends Component {
  render() {
    return(
      <div>
        <Switch>
          <Route exact path = "/" component = {Home} />
          <Route path = "/lobby" component = {Lobby} />
          <Route path = "/game" component = {ActGame} />
          <Redirect to = "/"/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(Main);