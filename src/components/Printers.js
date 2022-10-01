
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Platform, StyleSheet,
  Button, TouchableOpacity, Text, View, Alert,
  PermissionsAndroid
} from 'react-native';

import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';

const Devices = () => {

  const [printers, setPrinters] = useState([]);
  const [isDiscovering, setIsDiscovering] = useState(false); // Hide or reveal the spinner

  useEffect(() => {
    askForPermissions()
  }, [])

  printTestLabel = async (printer) => {
    alert(`A test label is printed on ${printer.name}`);

    try {
      //  const isConnected = await RNZebraBluetoothPrinter.connectDevice(printer.address);
      //  if(isConnected){
      //   const tags = {
      //     ZPL:  "! 0 200 200 203 1" + 'n' + "CENTER" + 'n',
      //     CPCL: "...",
      //     PDF: "...",
      //   };
      const zpl = `^XA ^PW1717^LL2576^LS0 ^LH0,0 ^FO0,0^GFA,553840,553840,215, ^GFA,553840,553840,215, ,Q0GCG0G2gH0G6I0G1yO0G7GFGCG3HFJ0G3GCG1GEM0HFG3GFGEG0GFGEL0G1GEI0GFG0G1GCyL0G3GFG8G1GFGEJ0GFGCG3GEM0GFGEG1GFGCG0GFGCL0G7GEH0G1GFG0G3GCyL0G1GEH0G7G8J0G1GCG0GEM0G3GCG0GFG8G0G3G8M0GEI0G7G0G3GCyL0G1GEH0G7G8J0G1GCG0GEM0G3GCG0G7G8G0G3N0GEI0G7G0G3GCyL0G0GEH0G7G8J0G1GCG0GEM0G3GCG0G7G8G0G3N0GEI0G7G0G3GCyL0G0GEH0G7G8J0G1GCG0GEM0G1GEG0G3G8G0G6N0GEI0G7G0G1GCyL0G0GEH0G7G8J0G1GCG0GEM0G1GEG0G3GCG0G6N0GEI0G7G0G1GCyL0G0GEH0G7G8G0G1GEG0G1GCG0GEH0G7G8J0GEG0G3GCG0G6G0G1GEH0G6G3G0GEH0GFG7G0G1GCyL0G0GEH0G7G8G0G7GFG8G1GCG0GEG0G1GFGEJ0GFG0G3GCG0GCG0G7GFG8G1GEGFG8GEG0G3HFG0G1GCyL0G0GEH0G7G8G0GCG3GCG1GCG0GEG0G3G0GFJ0GFG0G7GEG0GCG0GCG3GCG7HFG8GEG0G7G0GFG0G1GCyL0G0GEH0G7G8G1G8G3GCG1GCG0GEG0G6G0G7G8I0G7G0G7GEG0GCG1G8G1GEG0GFG3G0GEG0GEG0G7G0G1GCyL0G0JFG8G3G8G1GEG1GCG0GEG0GEG0G3G8I0G7G8G6GEG1G8G3G8G0GEG0GEH0GEG0GEG0G7G0G1GCyL0G0GEH0G7G8G3HFGEG1GCG0GEG0GEG0G3GCI0G7G8GCGFG1G8G3G8G0GFG0GEH0GEG1GCG0G7G0G1G8yL0G0GEH0G7G8G3HFGEG1GCG0GEG1GEG0G3GCI0G3G8GCGFG1G8G7G8G0GFG0GEH0GEG1GCG0G7G0G1G8yL0G0GEH0G7G8G3I0G1GCG0GEG1GEG0G1GCI0G3HCG7GBG0G7G8G0G7G0GEH0GEG1GCG0G7H0G8yL0G0GEH0G7G8G3G8H0G1GCG0GEG1GEG0G1GCI0G3GDG8G7GBG0G7G8G0G7G0GEH0GEG1GCG0G7H0G8yL0G0GEH0G7G8G3G8H0G1GCG0GEG1GEG0G1GCI0G1GDG8G3GBG0G7G8G0G7G0GEH0GEG1GCG0G7H0G8yL0G0GEH0G7G8G3G8G0G2G1GCG0GEG1GEG0G1GCI0G1GFG0G3GEG0G7G8G0G7G0GEH0GEG1GCG0G7yO0G0GEH0G7G8G3GCG0G6G1GCG0GEG0GEG0G1GCI0G1GFG0G3GEG0G3G8G0G7G0GEH0GEG1GEG0G7yO0G0GEH0G7G8G3GEG0GCG1GCG0GEG0GFG0G3G8J0GFG0G1GEG0G3GCG0GEG0GEH0GEG1GEG0G7G8yN0G1GEH0G7G8G1HFGCG1GCG0GEG0G7G0G3G8J0GEG0G1GCG0G1GCG0GEG0GEH0GEG0GFG0G7G8G1GCyL0G1GFH0G7G8G0HFG8G3GCG0GFG0G3G8G7K0G6G0G1GCH0GEG1GCG0GEG0G1GEG0G7HFGEG3GCyL0HFGCG3HFG0G7GFG0G7GFG3GFGCG1GFGEK0G6H0GCH0G7GFG8G3GFG8G3GFG8G3GFG7G8G1GCyL0M0G1GCM0G7L0G4H0G8H0G1GCN0GCG2H0G8yL0,::::::::X0G8K0G8M0G4gT0G6I0G6P0G8R0G6V0G4uW0G1IFGEG7HFH0HFGCJ0G3GCJ0G7G8L0G3GCgS0G1GEH0G1GEO0G7GCQ0G1GEU0G3GEuW0G1IFGEG3HFGEG0G7GFG8J0GFGCJ0GFG8L0G7GCgS0G7GEH0G7GEO0GFGCQ0G7GEU0G7GEuW0G3G8G0G3GCG0GFG0GFG8G1GEK0G3GCJ0G3G8L0G1GCgT0GEI0GEO0G3GCR0GEU0G1GEuW0G3H0G7GCG0GFG0G7GCG1GEK0G3GCJ0G3G8L0G1GCgL0G8M0GEI0GEO0G3GCI0G4N0GEG0G2S0G1GEuW0G3H0G7G8G0GFG0G3GCG1GEK0G1GCJ0G3G8L0G1GCgL0G8M0GEI0GEO0G3GCI0G4N0GEG0G2S0G1GEuW0G2H0GFH0GFG0G3GCG1GEK0G1GCJ0G3G8L0G1GCgK0G1G8M0GEI0GEO0G3GCI0GCN0GEG0G6S0G1GEuW0H0G1GFH0GFG0G3GEG1GEK0G1GCJ0G3G8L0G1GCgK0G3G8M0GEI0GEO0G3GCH0G1GCN0GEG0GES0G1GEuW0H0G1GEH0GFG0G3GEG1GEK0G1GCG0G3GCG0G3G8GEH0G1GEG0G1GCJ0GFI0G7G8G0G6G1GCH0G7G8G0G6G3G0G3GCG0G7GCG0G1GEH0G1HEI0GEG3G8M0G3GCG7G0G3GEG0G3G1GCG0GEH0GEG1GFH0G3GCK0G1G8GEG0G1GEJ0GFH0G1GFH0G2G1GCG0GEuG0H0G3GCH0GFG0G3GCG1GEK0G1GCG0HFG0G3G9GFG8G0G7GFG8G1GCI0G3HFGCG1GFGEG1GEG7GEG0G1GFGEG1GEGFG8HFG0HFG8G7GFG8G0G7GFGEI0GEGFGEG1GFGCG3GEH0G3GDGFG8G7GFGCGFG3GFG3GFG8G0GEG3GFGEG0HFG0G3HFGEG7GBGFG8G1GEI0G3GFGCG0G7GFGCG1GFG7GEG3GFG8u0H0G7G8H0GFG0G3GCG1GEK0G1GCG1GCG3G8G3GBGFGCG0GCG3GCG1GCI0G7G1GFGCG3G0GFG3GEHFG0G3G0GFG3GEGFG9GCG3G8G3G8G0GCG3GCG0GCG3GEI0IFG0GFH0GCH0G3HFGCG1GCG3IFG7GFG8G0GEG0GEG0G1G8G7G8G3G0G3GDIFGCG1GEI0G7G1GEG0GEG1GEG3IFG7GFG8u0H0G7G8H0GFG0G7G8G1GEK0G1GCG3GCG3G8G3GEG3GEG1G8G1GCG1GCI0GEG0GEG0G6G0GFG0GFG8GFG0G6G0GFG0GFG3GBGCG3G8G3G8G1GCG1GEG1GCG1GEI0GFG0GFG0G7G0G1G8H0G3GEG1GCG1GCG0GFG8G7GCG3GCG0GEG0GEG0G3G0G3GCG2G0G3G8G7GCG3GCG1GEI0GEG0GFG1GCG0GFG0GFG8G7GCG3GCu0H0GFI0GFG9GFG8G1GEK0G1GCG3GCG3G8G3G8G1GEG1G8G1GEG1GCI0GEG0GFG0GEG0G7G8GEG0G7G0GEG0G7G8GFG0G3GCG3G8G3G8G1G8G1GEG3G8G0GEI0GEG0G7G8G7G8G1G8H0G3GCG1GCG1GCG0G7G0G3G8G1GCG0GEG0GEG0G7G0G1GCG2G0G7G8G7G8G1GEG1GEI0GCG0GFG1GCG0GFG0GFG0G7G8G1GCu0G0G1GEI0HFGEG0G1GEK0G1GCG1G8G3G8G3G8G0GEG3HFGEG1GCI0GEG0GFG0IFG8GEG0G7G0IFG8GEG0G1G8G3G8G3G8G3HFGEG3G8G0GEI0GEG0G3G8G3G8G1G8H0G3GCG1GCG1GCG0G7G0G3G8G1GCG0GEG0GEG0G7G0G1GEH0GFG0G3G8G1GEG1GEH0G1GCG0G6G3GCG0G7G8GFG0G7G8G1GCu0G0G3GEI0GFI0G1GEK0G1GCH0GFG8G3G8G0GFG3HFGEG1GCI0GEG0G7G0IFG8GEG0G7G0IFG8GEI0GFG8G3G8G3HFGEG7G8G0GEI0GEG0G3G8G3GCG3I0G3GCG1GCG1GCG0G7G0G3G8G1GCG0GEG0GEG0GFG0G1GEG0G1GEG0G3G8G1GEG1GEH0G1GCH0G3GCG0G7G8GFG0G3G8G1GCu0G0G3GCI0GFI0G1GEK0G1GCG0G3GFG8G3G8G0GFG3G8H0G1GCI0GEG0GFG0GCI0GEG0G7G0GCI0GEH0G3GFG8G3G8G3G8H0G7G8G0GEI0GEG0G3G8G1GCG3I0G3GCG1GCG1GCG0G7G0G3G8G1GCG0GEG0GEG0GFH0GEG0G1GCG0G3G8G0GEG1GEH0G1GCH0G3G8G0G7G8GFG0G3G8G1GCu0G0G7G8I0GFI0G1GEK0G1GCG0GEG3G8G3G8G0GFG3G8H0G1GCI0GFG0GEG0GEI0GEG0G7G0GEI0GEH0GEG3G8G3G8G3G8H0G7G8G0GEI0GEG0G3G8G1GEG6I0G3GCG1GCG1GCG0G7G0G3G8G1GCG0GEG0GEG0GFH0GEG0G3GCG0G3G8G0GEG1GEH0G1GCH0G3GCG0G7G8GFG0G3G8G1GCu0G0GFG8I0GFI0G1GEK0G1GCG1GCG3G8G3G8G0GFG3G8H0G1GCI0G7G1GCG0GEI0GEG0G7G0GEI0GEG0G1GCG3G8G3G8G3G8H0G7G8G0GEI0GEG0G3G8G0GEG6I0G3GCG1GCG1GCG0G7G0G3G8G1GCG0GEG0GEG0GFH0GEG0G7G8G0G3G8G0GEG1GEH0G1GCH0G3GCG0G7G8GFG0G3G8G1GCu0G0GFH0G1G0GFI0G1GEH0G3H0G1GCG3G8G3G8G3G8G0GEG3G8G0G2G1GCI0G3GFG8G0GEH0G8GEG0G7G0GEH0G8GEG0G3G8G3G8G3G8G3GCG0G2G7G8G0GEI0GEG0G3G8G0GFG4I0G3GCG1GCG1GCG0G7G0G3G8G1GCG0GEG0GEG0GFH0GEG0GFH0G3G8G0GEG1GEH0G1GEG0G1G3GCG0G7G8GFG0G3G8G1GCu0G1GEH0G3G0GFI0G1GEH0G2H0G1GCG3G8G3G8G3G8G0GEG3GCG0G6G1GCI0G6I0GFG0G1G8GEG0G7G0GFG0G1G8GEG0G3G8G3G8G3G8G3GCG0G2G7G8G0GEI0GEG0G3G8G0G7GCI0G3GCG1GCG1GCG0G7G0G3G8G1GCG0GEG0GEG0G7H0GEG0GEG0G2G3G8G0GEG1GEH0G1GEG0H3GCG0G7G0GFG0G3G8G1GCu0G3GCH0G3G0GFI0G1GEH0G6H0G1GCG3G8G3G8G3G8G0GEG1GEG0G4G1GCI0GEI0GFG8G3G0GEG0G7G0GFG8G3G0GEG0G3G8G3G8G3GCG1GEG0G6G3GCG0GEI0GEG0G7H0G7GCI0G3GCG1GCG1GEG0G7G0G3G8G1GCG0GEG0GFG0G7G8G1GCG1GEG0G6G3G8G1GCG1GEI0GFG0G2G1GEG0G7G0GFG0G3G8G1GCu0G7GCH0G6G0GFI0G1GEH0GEH0G3GCG3GCG7G9G3G8G1GCG1HFGCG1GCI0GFGCH0G7HFG0GEG0G7G0G7HFG0GEG0G3GCG7G9G3GCG9HFGCG3GEG1GEI0GEG0G7H0G3G8I0G3GCG1GEG1GEG4G7G0G3G8G1GCG0GEG0GFG2G3G8G1GCG3GCG0G6G3G8G1GCG1GEG0GEG0GFGCGEG1GEG0G6G0GFG0G7G8G1GCu0G7IFGEG0GFI0G1IFGCH0G3GCG3HFGEG3GEG3G8G0HFG8G1GEI0IFG0G3GFGEG0GEG0G7G8G3GFGEG0GFG0G3HFGEG1GFG8HFG8G1IFG8H0GFG0GEH0G3G8I0G3GCG1GEG0GFGCGFG0G3G8G1GCG1GEG0G7GEG1GCG3G8G7G8G0GEG3GCG3G8G1GEG0GFG0G7GFGCG0GFG0GCG0GFG0G7G8G3GCu0JFGEG7GFGEH0JFGCH0HFG1GFG1GCG1HFH0G7GFG0G7GFG8H0G7HFG8G1GFGCG3GFGDGFGCG1GFGCG3GFGCG1GFG1GCG1GFG0G7GFH0GFGEGFI0G7GFG8H0G3J0HFG7GFG8GFGBGFGDGFGEG7GFG3GFG8G7GCG0HFG0G7HFGEG3HFG0G7GFG8GFG0G3GFG8G0G7GFG8G3GFGDGFGEHFu0g0G4I0G3G8H0G1GCL0G4G7GFGCG0G7M0G7K0G4K0G1GCH0G3H8J0GEI0G3gI0G3G8K0G3GBGCJ0G4H0GEI0GEuN0gV0GCH0GCgV0G3gP0G3G8vG0gU0G1G8H0GCgV0G6J0gKFGCG3G8gGFu0gU0G3G8H0G8gV0G6J0gKFGCG3G8gGFu0gU0G3GEG0G3G8gU0GFGCJ0gKFGCG7G8gGFu0gU0G1HFGEgU0G1GFG8gP0G7G8vG0gV0HFGCgV0GFgP0G1GFGEvG0gW0GCgW0G4wT0,::::::::::::::::::S0GCM0GCO0G6yX0S0GCG0G3K0HCN0G6yX0::S0GDGEG7GCGDGEG7G8GDGFG0GFG8G7GFGBG7G8G6H0G7G8G1GFG0GDGEG7G8yM0S0HFG7GCGFGEGFGCGDGFG1GFGCG7GFGBGFGCG6H0GFGCG3GFG8GFGEGFGCyM0S0GEH3G0GEG3G8ICG1G8GCG0G3GBG8GCG6H0GCGEG3G1G8GEG3G8GCyM0S0GCH3G0GCG3G0ICG3G0G6G0G7G3G0H6G0G1G8H6G0HCG3G0GCyM0S0GCH3G0GCG3G0ICG3G0G6G0GEG3G0H6G0G1G8G0G6G0HCG3G0GCyM0S0GCH3G0GCG3G0ICG3G0G6G1GCG3G0H6G0G1G8G0G6G0HCG3G0GCyM0S0GCH3G0GCG3G0ICG3G0G6G3G8G3G0H6G0G1G8G0G6G0HCG3G0GCyM0S0GCH3G0GCG3G0ICG3G0G6G7G0G3G0H6G0G1G8H6G0HCG3G0GCyM0S0GCH3G0GCG3G0ICG1G8GCGEG0G3G8GCG6H0GCGEG3G1G8GCG3G0GCyM0S0GCH3HCG3G0HCGFG1GFGCHFGBGFGCG6G3G0GFGCG3GFG8GCG3G0GCyM0S0GCG3G1HCG3G0HCG7G0GFG8HFGBG7G8G6G3G0G7G8G1GFG0GCG3G0GCyM0gN0G3zG0:::,::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::^FS^XZ`
      const isPrinted = await RNZebraBluetoothPrinter.print(printer.address, zpl)
      console.log(isPrinted)
    } catch (err) {
      console.log(err)
    }
  }

  askForPermissions = async () => {
    try {
      const isBluetoothEnabled = await RNZebraBluetoothPrinter
        .isEnabledBluetooth();
        const grantedConnect = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          {
            title: "يرجى السماح بالاتصال بالبلوتوث",
            message:`يرجى السماح بالاتصال بالبلوتوث حتى يتم الاتصال بالطابعة`,
            buttonNeutral: "لاحقاً",
            buttonNegative: "إلغاء",
            buttonPositive: "موافق"
          }
        );
        if (grantedConnect === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the bluetooth connect");
        } else {
          console.log("bluetooth connect permission denied");
        }
      if (!isBluetoothEnabled && grantedConnect === PermissionsAndroid.RESULTS.GRANTED) {
        await RNZebraBluetoothPrinter.enableBluetooth();
      }
      const grantedScan = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
          title: "البحث بالبلوتوث",
          message: `يرجى السماح بالبحث بالبلوتوث حتى يتم البحث عن الطابعات المتاحة`,
          buttonNeutral: "لاحقاً",
          buttonNegative: "إلغاء",
          buttonPositive: "موافق"
        }
      );
      if (grantedScan === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the bluetooth connect");
      } else {
        console.log("bluetooth connect permission denied");
      }
      const grantedAccessFine = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "الوصول إلى الموقع الدقيق",
          message: `يرجى السماح بالوصول إلى الموقع الدقيق حتى يتم البحث عن الطابعات المتاحة`,
          buttonNeutral: "لاحقاً",
          buttonNegative: "إلغاء",
          buttonPositive: "موافق"
        }
      );
      if (grantedAccessFine === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the ACCESS_FINE_LOCATION");
      } else {
        console.log("ACCESS_FINE_LOCATION  permission denied");
      }
      const pairedDevices = await RNZebraBluetoothPrinter.pairedDevices();
      const devices = pairedDevices.filter(device => device.class === 1664);
      setPrinters(devices)
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  connectToPrinter = async () => {
    try {
     
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }
  discoverPrinters = async () => {

    try {

      await setIsDiscovering(true)
      const scanResult = await RNZebraBluetoothPrinter.scanDevices();
      const { found } = JSON.parse(scanResult)
      const devices = found.filter(device => device.class === 1664);
      await setPrinters([...printers,...devices]);
      await setIsDiscovering(false)
    } catch (error) {
      alert(JSON.stringify(error))
    }

  }


  return (
    <View style={{ marginTop: 50 }}>
      <Text style={styles.headline}>{`All Mart label printer`}</Text>

      <Button
        title={"scan for devices"}
        color='#841584'
        disabled={isDiscovering}
        onPress={discoverPrinters}
      />
      {
        printers.map((printer, index) => (
          <TouchableOpacity
            key={printer.name}
            style={styles.container}
            onPress={() => printTestLabel(printer)}>
            <Text style={styles.text}>
              {printer.name}
            </Text>
          </TouchableOpacity>
        ))
      }

      <View style={{ marginTop: 150 }}>
        {isDiscovering && <ActivityIndicator size='large' color='#0000ff' />}
      </View>
    </View>
  )

}

export default Devices

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
