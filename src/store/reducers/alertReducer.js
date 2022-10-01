import {SET_ALERT, CLEAR_ERRORS} from '_actions/types';

const initialState = {
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {...state, error: {...action.payload}};
    case CLEAR_ERRORS:
      return {...state, error: null};
    default:
      return state;
  }
};
