import * as actionTypes from './actionTypes';
import { io } from 'socket.io-client';
import { rankIndex, suitIndex } from '../../cardsBoilerPlate';

export const joinStart = () => {
  return {
    type: actionTypes.JOIN_START
  };
}

export const joinSuccess = (socket, userName, roomCode) => {
  return {
    type: actionTypes.JOIN_SUCCESS,
    payload: { socket : socket,
               userName: userName,
               roomCode: roomCode
    }
  };
}

export const joinFail = (error) => {
  return {
    type: actionTypes.JOIN_FAIL,
    error: error
  };
}

const emitJoin = async(userName, roomCode, dispatch) => {
  const socket = io();
  socket.on('start', () => {
    dispatch({ type: actionTypes.START_SUCCESS});
  });

  socket.on('win', (name) => {
    dispatch({ type: actionTypes.GAME_END, payload: name});
  })

  socket.on('disconnect', () => {
    alert("You disconnected from the server");
    window.location.replace(window.location.origin);
  })

  socket.on('update-game-state', (state, cards) => {
    cards.sort((a,b) => {
      if (rankIndex[a.rank.shortName] < rankIndex[b.rank.shortName] ||
        (rankIndex[a.rank.shortName] === rankIndex[b.rank.shortName] &&
          suitIndex[a.suit.name] < suitIndex[b.suit.name])) {
        return -1;
      }
      return 1;
    });
    console.log("recieved game state, pushing to redux store", state, cards);
    dispatch({ type: actionTypes.UPDATE_GAME_SUCCESS, payload:  {state, cards} } );
  });
  await socket.emit('join', userName, roomCode, (error) => {
    if(error) {
      dispatch(joinFail(error));
    } else {
      dispatch(joinSuccess(socket, userName, roomCode));
    }
  })
}

export const join = (userName, roomCode) => {
  return dispatch => {
    dispatch(joinStart());
    emitJoin(userName, roomCode, dispatch);
  }
}