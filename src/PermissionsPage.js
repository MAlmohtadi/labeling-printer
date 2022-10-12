import React, { useCallback, useEffect, useState } from 'react';

import { StyleSheet, View, Text, Image, Linking, PermissionsAndroid, Android } from 'react-native';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import { CONTENT_SPACING, SAFE_AREA_PADDING } from './Constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as BANNER_IMAGE from './images/ZQ520.png';
import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';

const PermissionsPage = ({ navigation }) => {
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [permissions, setPermissions] = useState({
    'android.permission.BLUETOOTH_CONNECT': 'not-determined',
    'android.permission.BLUETOOTH_SCAN': 'not-determined',
    'android.permission.CAMERA': 'not-determined'
  })
  const [isLoading, setIsLoading] = useState(true);
  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') await Linking.openSettings();
    setPermissions({ ...permissions, 'android.permission.CAMERA': permission });
  }, []);

  const requestBluetoothPermission = useCallback(async () => {
    console.log('Requesting BLUETOOTH_CONNECT permission...');
    const res = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
    ])
    console.log(`BLUETOOTH permissions status: ${res}`);
    const keys = Object.keys(res);
    for (const permission of keys) {
      if (res[permission] === PermissionsAndroid.RESULTS.DENIED) await Linking.openSettings()
    }
    setPermissions({ ...permissions, ...res });
  }, [JSON.stringify(permissions)]);

  
  const requestLocationPermission = useCallback(async () => {
    console.log('Requesting location permission...');
    const res = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION]);
    console.log(`location permissions status: ${res}`);
    const keys = Object.keys(res);
    for (const permission of keys) {
      if (res[permission] === PermissionsAndroid.RESULTS.DENIED) await Linking.openSettings()
    }
    setPermissions({ ...permissions, ...permission });
  }, [JSON.stringify(permissions)]);

  const enableBluetooth = useCallback(async () => {

    try {
      const enableBluetooth = await RNZebraBluetoothPrinter.enableBluetooth();
      setIsBluetoothEnabled(enableBluetooth)
    } catch (error) {
      alert(JSON.stringify(error))
    }

  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]).then(setPermissions);
      RNZebraBluetoothPrinter
        .isEnabledBluetooth().then(setIsBluetoothEnabled);
    });
    if (isBluetoothEnabled === 'enabled') {
      RNZebraBluetoothPrinter
        .isEnabledBluetooth().then(setIsBluetoothEnabled);
    }

    if (permissions[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED
      && permissions[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED
      && permissions[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED
      && permissions[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED
      && isBluetoothEnabled === true) {
      navigation.replace('Root')
    }

    return unsubscribe;
  }, [JSON.stringify(permissions), isBluetoothEnabled, navigation]);
  return (
    <View style={styles.container}>
      <Image source={require('./images/ZQ520.png')} style={styles.banner} />
      <Text style={styles.welcome}>أهلا بك في برنامج طباعة المتاجر</Text>
      <View style={styles.permissionsContainer}>
        {permissions[PermissionsAndroid.PERMISSIONS.CAMERA] !== PermissionsAndroid.RESULTS.GRANTED && (
          <Text style={styles.permissionText}>
            {` يتطلب البرنامج استخدام`}<Text style={styles.bold}>الكاميرا</Text>.{' '}
            <Text style={styles.hyperlink} onPress={requestCameraPermission}>
              السماح
            </Text>
          </Text>
        )}
        {(permissions[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] !== PermissionsAndroid.RESULTS.GRANTED
          || permissions[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] !== PermissionsAndroid.RESULTS.GRANTED)
          && (
            <Text style={styles.permissionText}>
              {`يتطلب البرنامج استخدام`}<Text style={styles.bold}>البلوتوث</Text>.{' '}
              <Text style={styles.hyperlink} onPress={requestBluetoothPermission}>
                السماح
              </Text>
            </Text>
          )}

        {permissions[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] !== PermissionsAndroid.RESULTS.GRANTED && (
          <Text style={styles.permissionText}>
            {`يتطلب البرنامج استخدام`}<Text style={styles.bold}>البحث بالموقع</Text>.{' '}
            <Text style={styles.hyperlink} onPress={requestLocationPermission}>
              السماح
            </Text>
          </Text>
        )}
        {isBluetoothEnabled !== 'enabled' && (
          <Text style={styles.permissionText}>
            {`يتطلب البرنامج تفعيل`}<Text style={styles.bold}>البلوتوث</Text>.{' '}
            <Text style={styles.hyperlink} onPress={enableBluetooth}>
              السماح
            </Text>
          </Text>
        )}
      </View>
    </View>
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
    marginTop: CONTENT_SPACING * 2,
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

export default PermissionsPage