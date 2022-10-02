import {
  SCREEN_CHANGE
} from '../actions/types';

const initialState = {
  routeName:"Home"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SCREEN_CHANGE:
     
      return {...state,...action.payload};
    default:
      return state;
  }
};
