// src/components/ClubMarker.js

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ClubMarker = ({ club }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.marker} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: -15,
    resizeMode: 'contain',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'yellow',
  },
});

export default ClubMarker;