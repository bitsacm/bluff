import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  started: false,
  error: null,
  loading: false
};

const startReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.START_SUCCESS:
      return { started: true, error: null, loading: false }
    case actionTypes.START_START:
      return { started: false, error: null, loading: true }
    case actionTypes.START_FAIL: 
      return { started: false, error: state.error, loading: false }
    default:
      return {
        ...state
      };
  }
}

export default startReducer;