import React from 'react';
import './gameTable.css';
import Stack from "../cardStack";

function GameTable(props) {
  return(
    <div className="game-table mx-auto">
      <div className="game-table-card-box">
        <Stack count={props.gameState._state.totalCentralStackSize} shadow={false} randomOrientation={true} spread={0} takeSpace={false} />
      </div>
      <div className="rank-display text-center">
        <div className="rank-display-vertical">
          <h3 className="rank-display-text">{props.gameState ? (props.gameState._state.currentRank) : ''}</h3>
          <p className="rank-display-sub">{props.gameState._state.currentRank ? 'rank' : 'first turn'}</p>
        </div>
      </div>
    </div>
  );
}

export default GameTable;