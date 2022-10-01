
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Platform, StyleSheet,
  Button, TouchableOpacity, Text, View, Alert,
  PermissionsAndroid
} from 'react-native';

const Store = () => {
return <Text>Store</Text>
}

export default Store

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
