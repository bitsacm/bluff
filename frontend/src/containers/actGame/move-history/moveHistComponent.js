import React, { useEffect, useRef} from 'react';
import './moveHist.css';

function MoveHist(props) {
  
  const moveEndRef = useRef(null);

  const scrollToBottom = () => {
    moveEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [props.gameState._state.currentRound]);

  return(
    <div className="move-box">
        <h4 className="move-header">Move history</h4>
        <ul className = "move-list">
          {props.gameState && (props.gameState._state.currentRound !== undefined) ?
            props.gameState._state.currentRound.map((move) => {
              return (
                <li>{move}</li>
              );
            })
            : <div />}
          <div ref={moveEndRef} />
        </ul>
    </div>
  );
}

export default MoveHist;