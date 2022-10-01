import {SET_ALERT, CLEAR_ERRORS, TOGGLE_THEME} from './types';

// Set Alert
export const setAlert = (msg, type) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: {msg, type},
  });
};

// Clear Errors
export const clearErrors = () => (dispatch) => dispatch({type: CLEAR_ERRORS});

export const toggleTheme = () => (dispatch) => dispatch({type: TOGGLE_THEME});
