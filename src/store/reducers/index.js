import {combineReducers} from 'redux';
import alertReducer from './alertReducer';
import settingsReducer from './settingsReducer';
import navigationReducer from './navigationReducer';

export default combineReducers({
  alertReducer,
  settingsReducer,
  navigationReducer,
});
