import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  joinedIn: false,
  error: null,
  loading: false,
  socket: null
};

const joinReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.JOIN_SUCCESS:
      return { joinedIn: true, 
               error: null, 
               loading: false, 
               socket: action.payload.socket, 
               userName: action.payload.userName,
               roomCode: action.payload.roomCode }
    case actionTypes.JOIN_START:
      return { joinedIn: false, error: null, loading: true, socket: null, userName: undefined, roomCode: undefined }
    case actionTypes.JOIN_FAIL: 
      return { joinedIn: false, error: state.error, loading: false, socket: null, userName: undefined, roomCode: undefined}
    case actionTypes.JOIN_TERMINATE:
      return { ...state, joinedIn: false, error: null}
    default:
      return {
        ...state
      }
  }
};

export default joinReducer;