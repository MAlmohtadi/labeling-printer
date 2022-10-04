
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator, Platform,
//   Button, TouchableOpacity, Text, View, Alert,
//   PermissionsAndroid
// } from 'react-native';

// import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';

// const Printer = () => {

//   const [printers, setPrinters] = useState([]);
//   const [isDiscovering, setIsDiscovering] = useState(false); // Hide or reveal the spinner

//   useEffect(() => {
//     askForPermissions()
//   }, [])

//   printTestLabel = async (printer) => {
//     alert(`A test label is printed on ${printer.name}`);

//     try {
//       //  const isConnected = await RNZebraBluetoothPrinter.connectDevice(printer.address);
//       //  if(isConnected){
//       //   const tags = {
//       //     ZPL:  "! 0 200 200 203 1" + 'n' + "CENTER" + 'n',
//       //     CPCL: "...",
//       //     PDF: "...",
//       //   };
//       const zpl = `^XA
//       ^MMT
//       ^PW862
//       ^LL0609
//       ^LS0
//       ^PA1,1,1,1^FS
//       ^FT148,34^A0N,34,62^FB577,1,0,C^FH\^FD${productName}FS
//       ^BY3,3,89^FT239,196^BCN,,Y,N
//       ^FD>;400590003529>65^FS
//       ^FT283,430^A0N,80,79^FH\^FD2.250 JD^FS
//       ^PQ1,0,1,Y^XZ`
//       const isPrinted = await RNZebraBluetoothPrinter.print(printer.address, zpl)
//       console.log(isPrinted)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   askForPermissions = async () => {
//     try {
//       const isBluetoothEnabled = await RNZebraBluetoothPrinter
//         .isEnabledBluetooth();
//       const grantedConnect = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         {
//           title: "يرجى السماح بالاتصال بالبلوتوث",
//           message: `يرجى السماح بالاتصال بالبلوتوث حتى يتم الاتصال بالطابعة`,
//           buttonNeutral: "لاحقاً",
//           buttonNegative: "إلغاء",
//           buttonPositive: "موافق"
//         }
//       );
//       if (grantedConnect === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log("You can use the bluetooth connect");
//       } else {
//         console.log("bluetooth connect permission denied");
//       }
//       if (!isBluetoothEnabled && grantedConnect === PermissionsAndroid.RESULTS.GRANTED) {
//         await RNZebraBluetoothPrinter.enableBluetooth();
//       }
//       const grantedScan = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         {
//           title: "البحث بالبلوتوث",
//           message: `يرجى السماح بالبحث بالبلوتوث حتى يتم البحث عن الطابعات المتاحة`,
//           buttonNeutral: "لاحقاً",
//           buttonNegative: "إلغاء",
//           buttonPositive: "موافق"
//         }
//       );
//       if (grantedScan === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log("You can use the bluetooth connect");
//       } else {
//         console.log("bluetooth connect permission denied");
//       }
//       const grantedAccessFine = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: "الوصول إلى الموقع الدقيق",
//           message: `يرجى السماح بالوصول إلى الموقع الدقيق حتى يتم البحث عن الطابعات المتاحة`,
//           buttonNeutral: "لاحقاً",
//           buttonNegative: "إلغاء",
//           buttonPositive: "موافق"
//         }
//       );
//       if (grantedAccessFine === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log("You can use the ACCESS_FINE_LOCATION");
//       } else {
//         console.log("ACCESS_FINE_LOCATION  permission denied");
//       }
//       const pairedDevices = await RNZebraBluetoothPrinter.pairedDevices();
//       const devices = pairedDevices.filter(device => device.class === 1664);
//       setPrinters(devices)
//     } catch (error) {
//       alert(JSON.stringify(error))
//     }
//   }

//   connectToPrinter = async () => {
//     try {

//     } catch (error) {
//       alert(JSON.stringify(error))
//     }
//   }
//   discoverPrinters = async () => {

//     try {

//       await setIsDiscovering(true)
//       const scanResult = await RNZebraBluetoothPrinter.scanDevices();
//       const { found } = JSON.parse(scanResult)
//       const devices = found.filter(device => device.class === 1664);
//       await setPrinters([...printers, ...devices]);
//       await setIsDiscovering(false)
//     } catch (error) {
//       alert(JSON.stringify(error))
//     }

//   }


//   return (
//     <View style={{ flex: 1,  }}>
//       <Text style={styles.headline}>{`All Mart label printer`}</Text>

//       <Button
//         title={"scan for devices"}
//         color='#841584'
//         disabled={isDiscovering}
//         onPress={discoverPrinters}
//       />
//       {
//         printers.map((printer, index) => (
//           <TouchableOpacity
//             key={printer.name}
//             style={styles.container}
//             onPress={() => printTestLabel(printer)}>
//             <Text style={styles.text}>
//               {printer.name}
//             </Text>
//           </TouchableOpacity>
//         ))
//       }

//       <View style={{ marginTop: 150 }}>
//         {isDiscovering && <ActivityIndicator size='large' color='#0000ff' />}
//       </View>
//     </View>
//   )

// }

// export default Printer

// const styles = {
//   container: {
//     marginTop: 3,
//     padding: 10,
//     backgroundColor: '#d9f9b1',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   text: {
//     color: '#4f603c'
//   },

//   headline: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 17,
//     marginTop: 0,
//   },
// };
