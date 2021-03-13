import React from 'react';
import './opponent.css';
import Stack from "../cardStack";

function Opponent(props) {
  return(
    <div className="col-4 opponent-box">
      {props.deck !== undefined ?
        <div>
          <div className="top-stack-container text-center" >
            <Stack randomOrientation={false}
              count={props.deck.numberOfCards}
              spread={4}
              takeSpace={true}
              shadow={true}
            />
          </div>
          <p className="opponent-name">
            {props.deck.name}
            <span className="opponent-card-num">{ props.current === props.deck.name ? '\'s turn' : ''}</span>
          </p>
        </div>
        : <div />
      }
    </div>
  );
}

export default Opponent;

