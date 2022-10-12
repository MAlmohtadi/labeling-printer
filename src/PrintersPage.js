
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button, TouchableOpacity, Text, View, PermissionsAndroid, Alert
} from 'react-native';

import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';

const PrintersPage = () => {

  const [printers, setPrinters] = useState([]);
  const [isDiscovering, setIsDiscovering] = useState(false); // Hide or reveal the spinner
  const [message, setMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const discoverPrinters = async () => {

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

  // const getZplCode= ()=>{
  //   var listData = "Surimi Salad, Kanikama, Cream cheeseSurimi Salad, Kanikama, Cream cheese";
  // var fontwidth = 20;
  // var width = 300;
  // var lines = 3;
  // if (((listData.length * fontwidth)/width) > lines)
  //     fontwidth = fontwidth - 5;
  //     `^XA
  //     ^PW623
  //     ^FT90,62^A@N,${fontwidth},${fontwidth},TT0003M_^FH\^CI17^F8^FDنيفيا مزيل عرق رول اون للنساء^FS^CI0
  //     ^BY3,3,59^FT160,152^BCN,,Y,N
  //     ^FD>;123456789012^FS
  //     ^FT226,252^A0N,56,55^FH^FD2.25 JD^FS
  //     ^PQ1,0,1,Y^XZ`
  // }
  const printLabel = async () => {
    try {
      var listData = "Surimi Salad, Kanikama, Cream cheeseSurimi Salad, Kanikama, Cream cheese";
      var fontwidth = 20;
      var width = 300;
      var lines = 3;
      if (((listData.length * fontwidth) / width) > lines)
        fontwidth = fontwidth - 5;
      var zpl = "^XA^A0N," + fontwidth + "," + fontwidth + "^FB" + width + "," + lines + ",0,C^FD" + listData + "^FS^XZ";
      // const zpl = `^XA
      // ^PW623
      // ^FT90,62^A@N,37,38,TT0003M_^FH\^CI17^F8^FDنيفيا مزيل عرق رول اون للنساء^FS^CI0
      // ^BY3,3,59^FT160,152^BCN,,Y,N
      // ^FD>;123456789012^FS
      // ^FT226,252^A0N,56,55^FH^FD2.25 JD^FS
      // ^PQ1,0,1,Y^XZ`
      const isPrinted = await RNZebraBluetoothPrinter.print('CC:78:AB:7A:BE:05', zpl)
      if (isPrinted) {
        alert("تمت الطباعة")
      }
    } catch (err) {
      alert(err.message)
    }
  }

  const connectToPrinter = useCallback(async () => {
    let isConnected = false;

    try {
      isConnected = await RNZebraBluetoothPrinter.connectDevice('CC:78:AB:7A:BE:05')
    } catch (error) {
      alert(JSON.stringify(error))
    }
    setIsConnected(isConnected);
  })
  return (
    <View style={{ flex: 1, }}>
      <Text style={styles.headline}>{`Printers`}</Text>

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
            onPress={() => connectToPrinter(printer)}>
            <Text style={styles.text}>
              {printer.name}
            </Text>
          </TouchableOpacity>
        ))
      }
      {/* {isConnected && */}
      <TouchableOpacity
        style={styles.container}
        onPress={() => printLabel()}>
        <Text style={styles.text}>
          {`طباعة`}
        </Text>
      </TouchableOpacity>
      {/* } */}

      <View style={{ marginTop: 150 }}>
        {isDiscovering && <ActivityIndicator size='large' color='#0000ff' />}
      </View>
    </View>
  )

}

export default PrintersPage

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
