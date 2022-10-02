import React, { useCallback, useEffect, useState } from 'react';

import { StyleSheet, View, Text, Image, Linking, PermissionsAndroid } from 'react-native';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import { CONTENT_SPACING, SAFE_AREA_PADDING } from './Constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as BANNER_IMAGE from './images/ZQ520.png';
import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';

const PermissionsPage = ({ navigation }) => {
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState('not-determined');
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false)
  const [bluetoothPermission, setBluetoothPermission] = useState('not-determined');
  const [bluetoothScanPermission, setBluetoothScanPermission] = useState('not-determined');
  const [locationPermission, setLocationPermission] = useState('not-determined');


  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') await Linking.openSettings();
    setCameraPermissionStatus(permission);
  }, []);

  const requestBluetoothConnectPermission = useCallback(async () => {
    console.log('Requesting BLUETOOTH_CONNECT permission...');
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "يرجى السماح بالاتصال بالبلوتوث",
        message: `يرجى السماح بالاتصال بالبلوتوث حتى يتم الاتصال بالطابعة`,
        buttonNeutral: "لاحقاً",
        buttonNegative: "إلغاء",
        buttonPositive: "موافق"
      }
    );
    console.log(`BLUETOOTH_CONNECT permission status: ${permission}`);
    if (permission === PermissionsAndroid.RESULTS.DENIED) await Linking.openSettings();
    setBluetoothPermission(permission);
  })
  const requestLocationPermission = useCallback(async () => {
    console.log('Requesting ACCESS_FINE_LOCATION permission...');
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "الوصول إلى الموقع الدقيق",
        message: `يرجى السماح بالوصول إلى الموقع الدقيق حتى يتم البحث عن الطابعات المتاحة`,
        buttonNeutral: "لاحقاً",
        buttonNegative: "إلغاء",
        buttonPositive: "موافق"
      }
    );
    console.log(`ACCESS_FINE_LOCATION permission status: ${permission}`);
    if (permission === 'denied') await Linking.openSettings();
    setLocationPermission(permission);
  })
  const requestBluetoothScanPermission = useCallback(async () => {
    console.log('Requesting BLUETOOTH_SCAN permission...');
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "البحث بالبلوتوث",
        message: `يرجى السماح بالبحث بالبلوتوث حتى يتم البحث عن الطابعات المتاحة`,
        buttonNeutral: "لاحقاً",
        buttonNegative: "إلغاء",
        buttonPositive: "موافق"
      }
    );
    console.log(`BLUETOOTH_SCAN permission status: ${permission}`);
    if (permission === 'denied') await Linking.openSettings();
    setBluetoothScanPermission(permission);
  });

  const enableBluetooth = useCallback(async () => {
    if (bluetoothPermission === PermissionsAndroid.RESULTS.GRANTED) {
      await RNZebraBluetoothPrinter.enableBluetooth().then(setIsBluetoothEnabled);
    }
  })

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermissionStatus);
    RNZebraBluetoothPrinter
      .isEnabledBluetooth().then(setIsBluetoothEnabled);
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "يرجى السماح بالاتصال بالبلوتوث",
        message: `يرجى السماح بالاتصال بالبلوتوث حتى يتم الاتصال بالطابعة`,
        buttonNeutral: "لاحقاً",
        buttonNegative: "إلغاء",
        buttonPositive: "موافق"
      }
    ).then(status => status && setBluetoothPermission(PermissionsAndroid.RESULTS.GRANTED));

    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "البحث بالبلوتوث",
        message: `يرجى السماح بالبحث بالبلوتوث حتى يتم البحث عن الطابعات المتاحة`,
        buttonNeutral: "لاحقاً",
        buttonNegative: "إلغاء",
        buttonPositive: "موافق"
      }
    ).then(status => status && setBluetoothScanPermission(PermissionsAndroid.RESULTS.GRANTED));

    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "الوصول إلى الموقع الدقيق",
        message: `يرجى السماح بالوصول إلى الموقع الدقيق حتى يتم البحث عن الطابعات المتاحة`,
        buttonNeutral: "لاحقاً",
        buttonNegative: "إلغاء",
        buttonPositive: "موافق"
      }
    ).then(status => status && setLocationPermission(PermissionsAndroid.RESULTS.GRANTED));
    if (cameraPermissionStatus === 'authorized' && bluetoothPermission === PermissionsAndroid.RESULTS.GRANTED
      && bluetoothScanPermission === PermissionsAndroid.RESULTS.GRANTED && isBluetoothEnabled
      && locationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      navigation.replace('CameraPage')
    };
  }, [cameraPermissionStatus,bluetoothPermission,bluetoothScanPermission,locationPermission,isBluetoothEnabled, navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('./images/ZQ520.png')} style={styles.banner} />
      <Text style={styles.welcome}>أهلا بك في برنامج طباعة المتاجر</Text>
      <View style={styles.permissionsContainer}>
        {cameraPermissionStatus !== 'authorized' && (
          <Text style={styles.permissionText}>
            {` يتطلب البرنامج استخدام`}<Text style={styles.bold}>الكاميرا</Text>.{' '}
            <Text style={styles.hyperlink} onPress={requestCameraPermission}>
              السماح
            </Text>
          </Text>
        )}
        {bluetoothPermission !== PermissionsAndroid.RESULTS.GRANTED && (
          <Text style={styles.permissionText}>
            {`يتطلب البرنامج استخدام`}<Text style={styles.bold}>البلوتوث</Text>.{' '}
            <Text style={styles.hyperlink} onPress={requestBluetoothConnectPermission}>
              السماح
            </Text>
          </Text>
        )}
        {bluetoothScanPermission !== PermissionsAndroid.RESULTS.GRANTED && (
          <Text style={styles.permissionText}>
            {`يتطلب البرنامج استخدام`}<Text style={styles.bold}>البحث بالبلوتوث</Text>.{' '}
            <Text style={styles.hyperlink} onPress={requestBluetoothScanPermission}>
              السماح
            </Text>
          </Text>
        )}
        {locationPermission !== PermissionsAndroid.RESULTS.GRANTED && (
          <Text style={styles.permissionText}>
            {`يتطلب البرنامج استخدام`}<Text style={styles.bold}>البحث بالموقع</Text>.{' '}
            <Text style={styles.hyperlink} onPress={requestLocationPermission}>
              السماح
            </Text>
          </Text>
        )}
        {bluetoothPermission == PermissionsAndroid.RESULTS.GRANTED && !isBluetoothEnabled && (
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