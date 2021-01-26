import * as actionTypes from '../Actions/actionTypes';
import Game from '../../Game';

const initialState = {
  gameFetched: false,
  gameData: new Game(),
  hasEnded: false,
  winner: ''
};

const gameReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.UPDATE_GAME_SUCCESS:
      let newed = Object.create(state.gameData);
      newed.state = action.payload.state;
      newed.cards = action.payload.cards;
      console.log(newed);
      return { ...state, gameFetched: true, gameData: newed};
    case actionTypes.GAME_END: 
      return { ...state, hasEnded: true, winner: action.payload};
    default:
      return {
        ...state
      };
  }
};

export default gameReducer;