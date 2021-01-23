import * as actionTypes from './actionTypes';

export const startStart = () => {
  return {
    type: actionTypes.START_START
  };
}

export const startSuccess = () => {
  return {
    type: actionTypes.START_SUCCESS
  };
}

export const startFail = (error) => {
  return {
    type: actionTypes.START_FAIL,
    error: error
  };
}


const emitStart = async(dispatch, socket) => {
  await socket.emit('start', () => {
    dispatch(startSuccess()); 
  })
}

export const start = (socket) => {
  console.log(socket);
  return dispatch => {
    dispatch(startStart());
    emitStart(dispatch, socket);
  }
}