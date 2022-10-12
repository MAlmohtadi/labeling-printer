import { UPDATE_SETTINGS } from '../actions/types';

const initialState = {
  server: '',
  username: '',
  password: '',
  database: '',
  store: '',
  printerAddress:'',
  isConnected: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
