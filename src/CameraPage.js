import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Camera, useFrameProcessor, useCameraDevices } from 'react-native-vision-camera';
import { BarcodeFormat, scanBarcodes } from 'vision-camera-code-scanner';
import Reanimated, {
    runOnJS
} from 'react-native-reanimated';
import BarcodeMask from 'react-native-barcode-mask';
import { useIsForeground } from './hooks/useIsForeground';
import { useIsFocused } from '@react-navigation/core';
import { useRef } from 'react';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
const CameraPage = ({ navigation }) => {
    const camera = useRef(null);
    const [isCameraInitialized, setIsCameraInitialized] = useState(false);
    const devices = useCameraDevices();
    const device = devices.back;
    const isFocussed = useIsFocused();
    const isForeground = useIsForeground();
    const isActive = isFocussed && isForeground;

    const onInitialized = useCallback(() => {
        console.log('Camera initialized!');
        setIsCameraInitialized(true);
    }, []);
    const onError = useCallback((error) => {
        console.error(error);
    }, []);

    const onBarcodeDetected = useCallback((code) => {
        navigation.navigate("ProductPage", { barcode: code })
    }, [frameProcessor])

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet';
        const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.ALL_FORMATS], { checkInverted: true });
        console.log(JSON.stringify(detectedBarcodes))
        if (detectedBarcodes.length > 0) {
            runOnJS(onBarcodeDetected)(detectedBarcodes[0].displayValue);
        }

    }, [onBarcodeDetected]);

    useEffect(() => {
        console.log("test camera")
    }, []);

    return (
        device != null && (
            <>
                <ReanimatedCamera
                    ref={camera}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={isActive}
                    onInitialized={onInitialized}
                    onError={onError}
                    orientation="portrait"
                    frameProcessor={frameProcessor}
                    frameProcessorFps={1}
                    focusable={true}
                />
                <BarcodeMask width={300} height={100} edgeBorderWidth={1} showAnimatedLine outerMaskOpacity={0.8} />
            </>
        )
    );
}

const styles = StyleSheet.create({
    barcodeTextURL: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    }
});

export default CameraPage