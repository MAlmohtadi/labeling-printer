import {combineReducers} from 'redux';
import alertReducer from './alertReducer';
import printerReducer from './printerReducer';
import itemReducer from './itemReducer';
import storeConfigReducer from './storeConfigReducer';
import navigationReducer from './navigationReducer';

export default combineReducers({
  alertReducer,
  printerReducer,
  itemReducer,
  storeConfigReducer,
  navigationReducer,
});
