import * as actionTypes from '../Actions/actionTypes';
import Game from '../../Game';

const initialState = {
  gameFetched: false,
  gameData: new Game()
};

const gameReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.UPDATE_GAME_SUCCESS:
      let newed = Object.create(state.gameData);
      newed.state = action.payload.state;
      newed.cards = action.payload.cards;
      console.log(newed);
      return { gameFetched: true, gameData: newed};
    default:
      return {
        ...state
      };
  }
};

export default gameReducer;