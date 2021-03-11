import React from 'react';
import './moveHist.css';

function MoveHist(props) {
  return(
    <div className="move-box">
      <h4 className="move-header">Move history</h4>
      <ul>
        {props.gameState && (props.gameState._state.currentRound !== undefined) ?
          props.gameState._state.currentRound.map((move) => {
            return (
              <li>{move}</li>
            );
          })
          : <div />}
      </ul>
    </div>
  );
}

export default MoveHist;