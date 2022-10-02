// import React, { useState, useEffect, useCallback } from 'react';

// import { StyleSheet, Text } from 'react-native';
// import { useCameraDevices } from 'react-native-vision-camera';
// import { Camera, useFrameProcessor } from 'react-native-vision-camera';
// import { BarcodeFormat, scanBarcodes } from 'vision-camera-code-scanner';
// import {
//     useSharedValue,
//     runOnJS,
//     useDerivedValue,
//     useAnimatedReaction,
//   } from 'react-native-reanimated';
// export default function CameraPage() {
//     const [hasPermission, setHasPermission] = useState(false);
//     const [barcodes, setBarcodes] = useState([]);
//     const devices = useCameraDevices();
//     const device = devices.back;
//     const onBarcodeDetected = useCallback((barcode) => {
//         setBarcodes([...barcode])
  
//       }, [])
//     //   const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.ALL_FORMATS], {
//     //     checkInverted: false,
//     //   });
//     // const frameProcessor = useFrameProcessor((frame) => {
//     //     'worklet'
//     //     const qrCodes = useScanBarcodes([BarcodeFormat.ALL_FORMATS], {
//     //         checkInverted: false,
//     //     });
//     //     // setBarcodes()
//     //     console.log(`QR Codes in Frame: ${qrCodes}`)
//     // }, [])

//     // Alternatively you can use the underlying function:
//     //
//       const frameProcessor = useFrameProcessor((frame) => {
//         'worklet';
//         const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.ALL_FORMATS], { checkInverted: true, });
//         console.log(JSON.stringify(detectedBarcodes))
//         runOnJS(onBarcodeDetected)(detectedBarcodes);
//       }, [barcodes]);

//     useEffect(() => {
//         (async () => {
//             const status = await Camera.requestCameraPermission();
//             setHasPermission(status === 'authorized');
//         })();
//     }, []);

//     return (
//         device != null &&
//         hasPermission && (
//             <>
//                 <Camera
//                     style={StyleSheet.absoluteFill}
//                     device={device}
//                     isActive={true}
//                     frameProcessor={frameProcessor}
//                     frameProcessorFps={1}
//                 />
//                 {barcodes.map((barcode, idx) => (
//                     <Text key={idx} style={styles.barcodeTextURL}>
//                         {barcode.displayValue}
//                     </Text>
//                 ))}
//             </>
//         )
//     );
// }

// const styles = StyleSheet.create({
//     barcodeTextURL: {
//         fontSize: 20,
//         color: 'white',
//         fontWeight: 'bold',
//     },
// });