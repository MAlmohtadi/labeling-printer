
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { store, persistor } from './src/store/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppCustom from './src/AppCustom';

const App = () => {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <AppCustom />
    </PersistGate>
  </Provider>
}

export default App
