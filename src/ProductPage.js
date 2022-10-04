import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { CONTENT_SPACING, SAFE_AREA_PADDING } from './Constants';
import MSSQL from 'react-native-mssql';
import { Button, Card, Dialog, Text } from '@rneui/base';
import Barcode from "react-native-barcode-builder";
import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';

const ProductPage = ({ route, navigation, storeConfigReducer }) => {
    const [product, setPrduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const getProductDetails = useCallback(async (barcode) => {
        const query = `select iD.ItemNameDescription as name, u.Unit1Code as barcode, u.PriceVal as price
        from items i , RecLine r, UnitCode u, ItemNameDbl iD, Units un
        where  r.ItemCode = i.ItemcodeSeq and r.BranchNo = ${storeConfigReducer.store}
        and u.ItemCodeSeq = r.ItemCode and u.BranchNo = ${storeConfigReducer.store} and iD.BarCode = u.Unit1Code  
        and un.UnitID = u.UnitID and u.Unit1Code = '6291003204579' order by i.ItemcodeSeq`


        try {
            await MSSQL.connect(storeConfigReducer);
            const result = await MSSQL.executeQuery(query);
            if (result && result.length > 0) {
                setPrduct(result[0])
            } else {
                setMessage('منتج غير معروف')
            }
            await MSSQL.close();
        } catch (error) {
            alert(error.message)
        }
        setLoading(false)
    }, [])

    const printLabel = useCallback(async () => {
        try {
            const zpl = `^XA
          ^MMT
          ^PW862
          ^LL0609
          ^LS0
          ^PA1,1,1,1^FS
          ^FT148,34^A0N,34,62^FB577,1,0,C^FH\^FD${product.name}FS
          ^BY3,3,89^FT239,196^BCN,,Y,N
          ^FD>;${product.barcode}>65^FS
          ^FT283,430^A0N,80,79^FH\^FD${product.price} JD^FS
          ^PQ1,0,1,Y^XZ`
            const isPrinted = await RNZebraBluetoothPrinter.print(printer.address, zpl)
            console.log(isPrinted)
        } catch (err) {
            alert(err.message)
        }
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getProductDetails(route.barcode)
        });
        return unsubscribe;
    }, [navigation, route]);

    console.log('Product:', JSON.stringify(product))
    return <View style={styles.container}>
        <Text style={styles.welcome}>معلومات المنتج</Text>
        <View style={styles.productInfoContainer}>
            {product && (<Card containerStyle={{ backgroundColor: '#eac500' }}>
                <Card.Title>{product.name}</Card.Title>
                <Barcode value={product.barcode} height={80} format="CODE128" />
                <Text style={{ alignSelf: 'center' }}>{product.barcode}</Text>
                <Text>{'\n'}</Text>
                <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20 }}>{product.price} JD</Text>
            </Card>)

            }
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 20 }}>
                <Button title="طباعة" color="success" size="lg" />
                <Button title="رجوع" color='error' size="lg" onPress={() => navigation.goBack()} />
            </View>

            < Dialog isVisible={!loading && !product && message != null}
                onBackdropPress={() => navigation.goBack()}>
                <Dialog.Title title="حدث خطأ" />
                <Text>{message}</Text>
            </Dialog>
        </View>
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
const mapStateToProps = (state) => {
    return {
        storeConfigReducer: state.storeConfigReducer
    };
};

export default connect(mapStateToProps, {})(ProductPage)