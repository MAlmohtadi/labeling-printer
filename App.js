
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { store, persistor } from './src/store/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MyDrawer from './src/components/Drawer';

const App = () => {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <MyDrawer />
      <Notificaiton
        visible={isVisible}
        notificationData={notificaiton}
        buttonAction={() => {
          setIsVisible(false);
          setNotification(null);
        }}
      />
    </PersistGate>
  </Provider>
}

export default App

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    padding: 10,
    backgroundColor: '#d9f9b1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#4f603c'
  },

  headline: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 0,
  },

});
