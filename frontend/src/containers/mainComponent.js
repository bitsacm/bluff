import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Home from "./home/homeComponent";
import Game from "./game/gameComponent";
import Lobby from "./lobby/lobbyComponent";

class Main extends Component {
  render() {
    return(
      <div>
        <Switch>
          <Route exact path = "/" component = {Home} />
          <Route path = "/lobby" component = {Lobby} />
          <Route path = "/game" component = {Game} />
          <Redirect to = "/"/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(Main);