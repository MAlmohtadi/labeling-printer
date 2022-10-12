
import React, { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';

import SettingsPage from './SettingsPage';
import PrintersPage from './PrintersPage';
import PermissionsPage from './PermissionsPage';
import ProductPage from './ProductPage';
import CameraPage from './CameraPage';
import { Icon } from '@rneui/base';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppCustom = () => {
  const [cameraPermission, setCameraPermission] = useState();
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState()
  const [bluetoothPermission, setBluetoothPermission] = useState();
  const [bluetoothScanPermission, setBluetoothScanPermission] = useState();
  const [locationPermission, setLocationPermission] = useState();

  useEffect(() => {

    Camera.getCameraPermissionStatus().then(setCameraPermission);
    RNZebraBluetoothPrinter
      .isEnabledBluetooth().then(setIsBluetoothEnabled);
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT).then(setBluetoothPermission);
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN).then(setBluetoothScanPermission);
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(setLocationPermission);
  }, []);


  if (cameraPermission == null || isBluetoothEnabled == null || bluetoothPermission == null
    || bluetoothScanPermission == null || locationPermission == null) {
    // still loading
    return null;
  }

  const showPermissionsPage = cameraPermission !== 'authorized'
    || !isBluetoothEnabled
    || !bluetoothPermission
    || !bluetoothScanPermission
    || !locationPermission;

  return (<NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        statusBarStyle: 'dark',
        animation: 'slide_from_bottom',
        animationTypeForReplace: 'push',
      }}
      initialRouteName={showPermissionsPage ? 'PermissionsPage' : 'Root'}>
      <Stack.Screen name="PermissionsPage" component={PermissionsPage} options={{ headerShown: false }} />
      <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} />


    </Stack.Navigator>
  </NavigationContainer>)
}
function Root() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let type;
          if (route.name === 'ScanCamera') {
            iconName = 'barcode-scan';
          } else if (route.name === 'Settings') {
            iconName = 'database-settings-outline'
          }
          return <Icon type='material-community' name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',

      })}
    >

      <Tab.Screen name="Settings" component={SettingsPage} options={{ headerTitle: 'الإعدادات' }} />
      <Tab.Screen name="ScanCamera" component={CameraPage} options={{ headerTitle: 'طباعة ليبل' }} />
      <Tab.Screen name="ProductPage" component={ProductPage} options={{ headerTitle: 'معلومات المنتج' }} />

    </Tab.Navigator>
  );

}

export default AppCustom;