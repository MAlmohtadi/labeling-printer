import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import MSSQL from 'react-native-mssql';
import { Button, Card, Divider, Text } from '@rneui/base';
import Barcode from "react-native-barcode-builder";
import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';
import { Dialog } from '@rneui/themed';

import { SAFE_AREA_PADDING } from './Constants';

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
        // const name = 'بوك جبنة مثلثات 24 قطعة 360 غم';
        // const barcode = '6281048106990';
        const { name, barcode } = product;
        let width = 500;
        const barcodeLength = `${barcode}`.length
        const barcodeCharacterWeight = Math.abs(barcodeLength - 10) * 12;
        const shiftBarcode = barcodeLength > 10 ? 130 - barcodeCharacterWeight : 130 + barcodeCharacterWeight;
        const nameLength = `${name}`.length
        const startText = Math.ceil(width / 2);
        let fontBlock = nameLength * 10;

        if (fontBlock > width) {
            fontBlock = width
        }

        try {
            const zpl = `^XA
            ^PW535
            ^CWQ,E:TAH000.TTF
            ^BY2,3,70^FT${shiftBarcode},160^BCN,,Y,N
            ^FD${barcode}^FS
            ^FO${fontBlock + startText > width ? width : fontBlock + startText},5^AQN,28,^TBN,${width},100^PA1,1,1,1^FH\^CI17^F8^FD${name}^FS^CI0
            ^FT198,260^AQN,50,,TAH000^FD${product.price} JD^FS
            ^PQ1,0,1,Y^XZ`
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