import {combineReducers} from 'redux';
import alertReducer from './alertReducer';
import printerReducer from './printerReducer';
import itemReducer from './itemReducer';
import databaseReducer from './databaseReducer';
import navigationReducer from './navigationReducer';

export default combineReducers({
  alertReducer,
  printerReducer,
  itemReducer,
  databaseReducer,
  navigationReducer,
});
