import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { CONTENT_SPACING, SAFE_AREA_PADDING } from './Constants';


const ProductPage = ({ navigation }) => {

    console.log(JSON.stringify(navigation))
    useEffect(() => {

    }, []);

    return <View style={styles.container}>
        
        <Image source={require('./images/ZQ520.png')} style={styles.banner} />
        <Text style={styles.welcome}>يتم جلب المعلومات</Text>
        <View style={styles.productInfoContainer}>

            <Text style={styles.productInfoText}>
                {` يتطلب البرنامج استخدام`}<Text style={styles.bold}>الكاميرا</Text>
            </Text>
        </View>
    </View>
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
    productInfoContainer: {
        marginTop: CONTENT_SPACING * 2,
    },
    productInfoText: {
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

export default ProductPage