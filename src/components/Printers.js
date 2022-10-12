
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Platform,
  Button, TouchableOpacity, Text, View, Alert,
  PermissionsAndroid
} from 'react-native';

import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';

const Printer = () => {

  const [printers, setPrinters] = useState([]);
  const [isDiscovering, setIsDiscovering] = useState(false); // Hide or reveal the spinner

  useEffect(() => {
    askForPermissions()
  }, [])

  const printLabel = async (printer) => {
    alert(`A test label is printed on ${printer.name}`);

    try {
      //  const isConnected = await RNZebraBluetoothPrinter.connectDevice(printer.address);
      //  if(isConnected){
      //   const tags = {
      //     ZPL:  "! 0 200 200 203 1" + 'n' + "CENTER" + 'n',
      //     CPCL: "...",
      //     PDF: "...",
      //   };
      const zpl = `^XA ^PW1717^LL2576^LS0 ^LH0,0 ^FO0,0^GFA,553840,553840,215, ^GFA,553840,553840,215, lX0G2G0G2Y0G3I0G2sK0lN0G1HFG1HFI0G1GEG1GEL0GFGEG7GFG8G3GFL0GFH0G1GEG0G6sI0lO0G7GCG0G7GCI0G3GEG1GEL0G7GCG1GFG0G1GCK0G1GFH0G3GEG0GFsI0lO0G3G8G0G3G8J0GEG0GEL0G3GCG0GEG0G1G8L0G7I0GEG0GFsI0lO0G3G8G0G3G8J0GEG0G6L0G1GCG0GEG0G1G8L0G7I0GEG0GFsI0lO0G3G8G0G3G8J0GEG0G6L0G1GCG0GFG0G1G8L0G7I0GEG0GFsI0lO0G3G8G0G3G8J0GEG0G6L0G1GEG0G7G0G1M0G7I0GEG0GEsI0lO0G3G8G0G3G8G0G3GCG0GEG0G6G0G1GFJ0GEG0G7G0G3G0G1GEG0G1G9G8G7H0HEG0GEsI0lO0G3G8G0G3G8G0GFGEG0GEG0G6G0G3GFG8I0GEG0GFG8G3G0G7GFG8G7GBGCG7G0G3GFGEG0G6sI0lO0G3G8G0G3G8G1G8G7G0GEG0G6G0G6G1GCI0GFG0GFG8G2G0GCG3GCHFGCG7G0G6G1GEG0G6sI0lO0G3IFG8G3G0G7G8GEG0G6G0GCG0GEI0G7G0GFGCG6G1GCG1GCG3GCG0G7G0GEG0GEG0G6sI0lO0G3IFG8G3G0G7G8GEG0G6G1GCG0GFI0G7G1G9GCG6G1G8G1GEG3G8G0G7G0GCG0GEG0G6sI0lO0G3G8G0G3G8G3HFG8GEG0G6G1GCG0G7I0G7H9GCG4G3G8G0GEG3G8G0G7G1GCG0GEG0G6sI0lO0G3G8G0G3G8G7I0GEG0G6G1GCG0G7I0G3H9GEGCG3G8G0GEG3G8G0G7G1GCG0GEG0G6sI0lO0G3G8G0G3G8G7I0GEG0G6G1GCG0G7I0G3GFG0GEGCG3G8G0GEG3G8G0G7G1GCG0GEG0G6sI0lO0G3G8G0G3G8G7I0GEG0G6G1GCG0G7I0G1GFG0GFG8G3G8G0GEG3G8G0G7G1GCG0GEG0G4sI0lO0G3G8G0G3G8G3G8G0G8GEG0G6G1GCG0G7I0G1GEG0GFG8G3GCG0GEG3G8G0G7G1GEG0GEsK0lO0G3G8G0G3G8G3GCG1G8GEG0G6G1GEG0G6I0G1GEG0G7G8G1GCG0GCG3G8G0G7G1GEG0GEsK0lO0G3G8G0G3G8G3GEG3G0GEG0G7G0GEG0GEJ0GEG0G7G0G1GCG0GCG3G8G0G7G0GFG0GEG0G6sI0lO0G3GCG0G3G8G1HFG0GEG0GFG0G7G0GCJ0GCG0G7H0GEG1G8G3G8G0G7G0G7HFG8GFsI0lN0G1HFG1HFG0GFGEG1GFG9GFG8G3GFG8J0GCG0G3H0G7GFG0GFGEG1GFGCG3HFG0GFsI0lU0G3G8L0GCM0G2H0G1GCM0GCG4G0G4sI0,:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::S0GCM0GCO0G6yX0S0GCG0G3K0HCN0G6yX0::S0GDGEG7GCGDGEG7G8GDGFG0GFG8G7GFGBG7G8G6H0G7G8G1GFG0GDGEG7G8yM0S0HFG7GCGFGEGFGCGDGFG1GFGCG7GFGBGFGCG6H0GFGCG3GFG8GFGEGFGCyM0S0GEH3G0GEG3G8ICG1G8GCG0G3GBG8GCG6H0GCGEG3G1G8GEG3G8GCyM0S0GCH3G0GCG3G0ICG3G0G6G0G7G3G0H6G0G1G8H6G0HCG3G0GCyM0S0GCH3G0GCG3G0ICG3G0G6G0GEG3G0H6G0G1G8G0G6G0HCG3G0GCyM0S0GCH3G0GCG3G0ICG3G0G6G1GCG3G0H6G0G1G8G0G6G0HCG3G0GCyM0S0GCH3G0GCG3G0ICG3G0G6G3G8G3G0H6G0G1G8G0G6G0HCG3G0GCyM0S0GCH3G0GCG3G0ICG3G0G6G7G0G3G0H6G0G1G8H6G0HCG3G0GCyM0S0GCH3G0GCG3G0ICG1G8GCGEG0G3G8GCG6H0GCGEG3G1G8GCG3G0GCyM0S0GCH3HCG3G0HCGFG1GFGCHFGBGFGCG6G3G0GFGCG3GFG8GCG3G0GCyM0S0GCG3G1HCG3G0HCG7G0GFG8HFGBG7G8G6G3G0G7G8G1GFG0GCG3G0GCyM0gN0G3zG0:::,:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::lX0G2G0G2Y0G3I0G2sK0^FS^XZ`
      const isPrinted = await RNZebraBluetoothPrinter.print(printer.address, zpl)
      console.log(isPrinted)
    } catch (err) {
      console.log(err)
    }
  }

  const askForPermissions = async () => {
    try {
      const isBluetoothEnabled = await RNZebraBluetoothPrinter
        .isEnabledBluetooth();
      const grantedConnect = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: "يرجى السماح بالاتصال بالبلوتوث",
          message: `يرجى السماح بالاتصال بالبلوتوث حتى يتم الاتصال بالطابعة`,
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
      await setPrinters([...printers, ...devices]);
      await setIsDiscovering(false)
    } catch (error) {
      alert(JSON.stringify(error))
    }

  }


  return (
    <View style={{ flex: 1,  }}>
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
            onPress={() => printLabel(printer)}>
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

export default Printer

const styles = {
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

};
