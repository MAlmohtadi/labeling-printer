import React, { useCallback, useEffect, useState } from 'react';

import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { CONTENT_SPACING, SAFE_AREA_PADDING } from './Constants';

import { Input } from '@rneui/themed';
import { Button, Dialog } from '@rneui/base';
import MSSQL from 'react-native-mssql';
import { connect } from 'react-redux';
import { updateStoreConfig } from './store/actions/storeConfigActions'

const StoreConfigPage = ({route, navigation, storeConfigReducer, updateStoreConfig }) => {
  const { server, username, password,
    database, store, isConnected } = storeConfigReducer

  const [loading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();
  const disableConnect = !server || !username || !password || !database || !store;
  const connectToDatabase = useCallback(async () => {
    setIsLoading(true)
    const config = { ...storeConfigReducer }
    try {
      const result = await MSSQL.connect(config)
      if (result === 'Connection Successful!') {
        updateStoreConfig({ isConnected: true })
        navigation.push("CameraPage")
      } else {
        setMessage(result)
      }
    } catch (error) {
      setMessage(error.message)
    }

    setIsLoading(false)
  })
  const clearError = () => {
    setMessage(null);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcome}>معلومات المتجر</Text>
      <ScrollView style={styles.permissionsContainer}>
        <Input placeholder='server' value={server} onChangeText={(value) => updateStoreConfig({ server: value })} />
        <Input placeholder='username' value={username} onChangeText={(value) => updateStoreConfig({ username: value })} />
        <Input placeholder='password' value={password} onChangeText={(value) => updateStoreConfig({ password: value })} />
        <Input placeholder='database' value={database} onChangeText={(value) => updateStoreConfig({ database: value })} />
        <Input placeholder='store' value={store} onChangeText={(value) => updateStoreConfig({ store: value })} />
        <Button title='connect' color={'green'} disabled={disableConnect} onPress={connectToDatabase} loading={loading} />
        <Dialog
          isVisible={!loading && !isConnected && message != null}
          onBackdropPress={clearError}
        >
          <Dialog.Title title="حدث خطأ" />
          <Text>{message}</Text>
        </Dialog>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  welcome: {
    color: 'black',
    fontSize: 38,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
  banner: {
    position: 'absolute',
    opacity: 0.8,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    ...SAFE_AREA_PADDING,
  },
  permissionsContainer: {
    marginHorizontal: 20
  },
  permissionText: {
    fontSize: 17,
    color: 'black'
  },
  hyperlink: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});
const mapStateToProps = (state) => {
  return {
    storeConfigReducer: state.storeConfigReducer
  };
};

export default connect(mapStateToProps, {
  updateStoreConfig
})(StoreConfigPage)