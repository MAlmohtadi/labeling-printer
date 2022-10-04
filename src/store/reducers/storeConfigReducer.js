import { UPDATE_STORE_CONFIG } from '../actions/types';

const initialState = {
  server: '',
  username: '',
  password: '',
  database: '',
  store: '',
  isConnected: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STORE_CONFIG:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
