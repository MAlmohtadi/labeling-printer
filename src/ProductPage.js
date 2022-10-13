import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import MSSQL from 'react-native-mssql';
import { Button, Card, Divider, Text } from '@rneui/base';
import Barcode from "react-native-barcode-builder";
import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';
import { Dialog } from '@rneui/themed';

import {  SAFE_AREA_PADDING } from './Constants';

const ProductPage = ({ route, navigation, settingsReducer }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const getProductDetails = useCallback(async (barcode) => {
        const query = `select iD.ItemNameDescription as name, u.Unit1Code as barcode, u.PriceVal as price
        from items i , RecLine r, UnitCode u, ItemNameDbl iD, Units un
        where  r.ItemCode = i.ItemcodeSeq and r.BranchNo = ${settingsReducer.store}
        and u.ItemCodeSeq = r.ItemCode and u.BranchNo = ${settingsReducer.store} and iD.BarCode = u.Unit1Code  
        and un.UnitID = u.UnitID and u.Unit1Code = '${barcode}' order by i.ItemcodeSeq`


        try {
            await MSSQL.connect(settingsReducer);
            const result = await MSSQL.executeQuery(query);
            if (result && result.length > 0) {
                setProduct(result[0])
            } else {
                setMessage(`لم يتم العثور على المنتج الذي يحمل رقم باركود ${route.params?.barcode}`)
            }
            await MSSQL.close();
        } catch (error) {
            alert(error.message)
        }
        setLoading(false)
    }, [])

    const printLabel = useCallback(async () => {
        var fontwidth = 30;
        var width = 300;
        var lines = 3;
        if (((product.name.length * fontwidth) / width) > lines)
            fontwidth = fontwidth - 2;
        try {
            const zpl = `^XA
            ^CI28
            ^CWZ,E:TT0003M_.TTF
            ^FT120,30^PA0,1,1,1^A@N,${fontwidth},${fontwidth}^FD${product.name}^FS^CI0
            ^BY3,3,95^FT162,166^BCN,,Y,N
            ^FD>;${product.barcode}^FS
            ^FT224,273^A0N,51,57^FB179,1,0,C^FH\^FD${product.price} JD^FS^XZ`
            const isPrinted = await RNZebraBluetoothPrinter.print(settingsReducer.printerAddress, zpl)
            console.log(isPrinted)
        } catch (err) {
            alert(err.message)
        }
    }, [product])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getProductDetails(route.params?.barcode)
        });
        return unsubscribe;
    }, [navigation, route, settingsReducer, product]);

    console.log('Product:', JSON.stringify(product))
    console.log('Route:', JSON.stringify(route))
    console.log('message:', JSON.stringify(message))
    console.log('loading:', JSON.stringify(loading))
    return <View style={styles.container}>
        <View style={styles.productInfoContainer}>
            {product
                && (<><Card containerStyle={{ backgroundColor: '#eac500' }}>
                    <Card.Title>{product.name}</Card.Title>
                    <Barcode value={product.barcode} height={80} format="CODE128" />
                    <Text style={{ alignSelf: 'center' }}>{product.barcode}</Text>
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 32 }}>{product.price} JD</Text>

                </Card>
                    <View style={{ margin: 18 }}>
                        <Divider />
                        <Button title="طباعة" color="success" size="lg" onPress={printLabel} />
                        {/* <Button title="رجوع" color='error' size="lg" onPress={() => navigation.goBack()} />  </View> */}
                    </View>
                </>)}
        </View>
        <Dialog isVisible={loading}>
            <Dialog.Loading />
        </Dialog>
        <Dialog isVisible={product == null && message != null} >
            <Dialog.Title title="حدث خطأ" titleStyle={{ color: 'black' }} />
            <Text>{message}</Text>
            <Dialog.Actions>
                <Dialog.Button title="العودة" onPress={() => navigation.goBack()} />
            </Dialog.Actions>
        </Dialog>

    </View >
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
        flex: 1,
        justifyContent: 'space-around',
        // marginTop: CONTENT_SPACING * 2,
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
const mapStateToProps = (state) => {
    return {
        settingsReducer: state.settingsReducer
    };
};

export default connect(mapStateToProps, {})(ProductPage)