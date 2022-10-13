import React, { useCallback, useEffect, useState } from 'react';

import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { SAFE_AREA_PADDING } from './Constants';

import { Input, Button, Dialog, CheckBox, } from '@rneui/themed';
import MSSQL from 'react-native-mssql';
import { connect } from 'react-redux';
import { updateSettings } from './store/actions/settingsActions'
import { Icon } from '@rneui/base';
import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';

const SettingsPage = ({ route, navigation, settingsReducer, updateSettings }) => {
  // const { theme } = useTheme();
  const { server, username, password,
    database, store, printerAddress } = settingsReducer
  const [settingsForm, setSettingsForm] = useState({})
  const [printers, setPrinters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDiscoveringDialogVisible, setIsDiscoveringDialogVisible] = useState(false);
  const [isDiscovering, setIsDiscovering] = useState(false); // Hide or reveal the spinner
  const [message, setMessage] = useState();
  const [checked, setChecked] = useState(-1);
  const disableForm = settingsForm.server === server && settingsForm.username === username
    && settingsForm.password === password && settingsForm.database === database
    && settingsForm.store === store && settingsForm.printerAddress === printerAddress;

  useEffect(() => {
    setSettingsForm({ ...settingsReducer });
  }, [navigation, settingsReducer])
  
  const clearError = () => {
    setMessage(null);
  }

  const discoverPrinters = useCallback(async () => {
    await setIsDiscovering(true)
    try {
      const scanResult = await RNZebraBluetoothPrinter.scanDevices();
      const { found } = JSON.parse(scanResult)
      const pairedDevices = await RNZebraBluetoothPrinter.pairedDevices();
      const pairedDevicesFiltered = pairedDevices.filter(device => device.class === 1664);
      const devices = found.filter(device => device.class === 1664);
      await setPrinters([...devices, ...pairedDevicesFiltered]);
    } catch (error) {
      alert(JSON.stringify(error))
    }
    await setIsDiscovering(false)
    await setIsDiscoveringDialogVisible(true)
  }, [isDiscoveringDialogVisible, isDiscovering]);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.permissionsContainer}>
        <Input placeholder='عنوان الشبكة' value={settingsForm.server || server}
          leftIcon={{ type: 'material-community', name: 'server' }}
          onChangeText={(value) => setSettingsForm({ ...settingsForm, server: value })} />
        <Input placeholder='اسم االمستخدم' value={settingsForm.username || username}
          leftIcon={{ type: 'material-community', name: 'account' }}
          onChangeText={(value) => setSettingsForm({ ...settingsForm, username: value })} />
        <Input placeholder='كلمه السر' secureTextEntry value={settingsForm.password || password}
          leftIcon={{ type: 'material-community', name: 'form-textbox-password' }}
          onChangeText={(value) => setSettingsForm({ ...settingsForm, password: value })} />
        <Input placeholder='اسم قاعدة البيانات' value={settingsForm.database || database}
          leftIcon={{ type: 'fontisto', name: 'shopping-pos-machine' }}
          onChangeText={(value) => setSettingsForm({ ...settingsForm, database: value })} />
        <Input placeholder='رقم المتجر/الفرع' value={settingsForm.store || store}
          leftIcon={{ type: 'material-community', name: 'store-marker' }}
          onChangeText={(value) => setSettingsForm({ ...settingsForm, store: value })} />
        <Input placeholder='عنوان الطابعة' value={settingsForm.printerAddress || printerAddress}
          leftIcon={{ type: 'material-community', name: 'printer' }}
          rightIcon={<Icon type='material-community' name='printer-search' onPress={discoverPrinters} />}
          onChangeText={(value) => setSettingsForm({ ...settingsForm, printerAddress: value })} />

        <Button title='حفظ' color={'green'} disabled={disableForm} onPress={() => updateSettings({ ...settingsForm })} loading={isLoading} />

        <Dialog isVisible={isDiscovering} onBackdropPress={() => { setIsDiscovering(false); }}>
          <Dialog.Loading />
        </Dialog>
        <Dialog
          isVisible={isDiscoveringDialogVisible}
          onBackdropPress={() => setIsDiscoveringDialogVisible(false)}
        >
          <Dialog.Title title="Select Preference" />
          {printers.map((item, i) => (
            <CheckBox
              key={i}
              title={item.address + ' ' + item.name}
              containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={checked === i + 1}
              onPress={() => setChecked(i + 1)}
            />
          ))}

          <Dialog.Actions>
            <Dialog.Button
              title="موافق"
              onPress={() => {
                setSettingsForm({  ...settingsForm, printerAddress: printers[checked - 1].address }); setIsDiscoveringDialogVisible(false)
              }}
            />
            <Dialog.Button title="إلغاء" onPress={() => setIsDiscoveringDialogVisible(false)} />
          </Dialog.Actions>
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
    settingsReducer: state.settingsReducer
  };
};

export default connect(mapStateToProps, {
  updateSettings
})(SettingsPage)