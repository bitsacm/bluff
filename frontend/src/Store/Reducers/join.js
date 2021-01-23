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
      return { joinedIn: true, error: null, loading: false, socket: action.payload }
    case actionTypes.JOIN_START:
      return { joinedIn: false, error: null, loading: true, socket: null }
    case actionTypes.JOIN_FAIL: 
      return { joinedIn: false, error: state.error, loading: false, socket: null }
    default:
      return {
        ...state
      }
  }
};

export default joinReducer;