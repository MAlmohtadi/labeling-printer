
import React, { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PermissionsPage from './PermissionsPage';
// import { MediaPage } from './MediaPage';
import CameraPage from './CameraPage';
import ProductPage from './ProductPage';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';
import StoreConfigPage from './StoreConfigPage';
const Stack = createNativeStackNavigator();

const AppCustom = () => {
  const [cameraPermission, setCameraPermission] = useState();
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false)
  const [bluetoothPermission, setBluetoothPermission] = useState();
  const [bluetoothScanPermission, setBluetoothScanPermission] = useState();
  const [locationPermission, setLocationPermission] = useState();


  useEffect(() => {

    Camera.getCameraPermissionStatus().then(setCameraPermission);
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
    ).then(setBluetoothPermission);

    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "البحث بالبلوتوث",
        message: `يرجى السماح بالبحث بالبلوتوث حتى يتم البحث عن الطابعات المتاحة`,
        buttonNeutral: "لاحقاً",
        buttonNegative: "إلغاء",
        buttonPositive: "موافق"
      }
    ).then(setBluetoothScanPermission);

    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "الوصول إلى الموقع الدقيق",
        message: `يرجى السماح بالوصول إلى الموقع الدقيق حتى يتم البحث عن الطابعات المتاحة`,
        buttonNeutral: "لاحقاً",
        buttonNegative: "إلغاء",
        buttonPositive: "موافق"
      }
    ).then(setLocationPermission);
  }, []);


  if (cameraPermission == null) {
    // still loading
    return null;
  }

  const showPermissionsPage = cameraPermission !== 'authorized'
    || !isBluetoothEnabled
    || bluetoothPermission !== PermissionsAndroid.RESULTS.GRANTED
    || bluetoothScanPermission !== PermissionsAndroid.RESULTS.GRANTED
    || locationPermission !== PermissionsAndroid.RESULTS.GRANTED;
  return (<NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // headerShown: false,
          statusBarStyle: 'dark',
          animation: 'slide_from_bottom',
          animationTypeForReplace: 'push',
        }}
        initialRouteName={showPermissionsPage ? 'PermissionsPage' : 'StoreConfigPage'}>
        <Stack.Screen name="PermissionsPage" component={PermissionsPage} options={{ headerShown: false }} />
        <Stack.Screen name="StoreConfigPage" component={StoreConfigPage} options={{ headerTitle: "معلومات المتجر" }} />
        <Stack.Screen name="CameraPage" component={CameraPage} options={{ headerTitle: "قارئ الباركود" }} />
        <Stack.Screen name="ProductPage" component={ProductPage}  options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppCustom;