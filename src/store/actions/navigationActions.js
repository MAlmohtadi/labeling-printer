import {
  SCREEN_CHANGE,
} from './types';

export const screenChange = (data) => (dispatch) => {
  console.log("screenChange: ",data)
      dispatch({
        type: SCREEN_CHANGE,
        payload: data,
      });
};


