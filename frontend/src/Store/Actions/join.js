import * as actionTypes from './actionTypes';
import { io } from 'socket.io-client';

export const joinStart = () => {
  return {
    type: actionTypes.JOIN_START
  };
}

export const joinSuccess = (socket) => {
  return {
    type: actionTypes.JOIN_SUCCESS,
    payload: socket
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
  await socket.emit('join', userName, roomCode, (error) => {
    if(error) {
      dispatch(joinFail(error));
    } else {
      dispatch(joinSuccess(socket));
    }
  })
}

export const join = (userName, roomCode) => {
  return dispatch => {
    dispatch(joinStart());
    emitJoin(userName, roomCode, dispatch);
  }
}