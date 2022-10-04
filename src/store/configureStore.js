import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'storeConfigReducer',
    'printerReducer',
    'itemReducer',
  ],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [],
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewareEnhancer = compose(
  applyMiddleware(...[createLogger(), thunkMiddleware]),
);
// const middlewareEnhancer = compose(applyMiddleware(...[thunkMiddleware]))

// Redux: Store
const store = createStore(persistedReducer, {}, middlewareEnhancer);
// Middleware: Redux Persist Persister
const persistor = persistStore(store);
// Exports

export {store, persistor};
