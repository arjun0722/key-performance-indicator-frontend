// Import dependencies
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import ClubMarker from './ClubMarker';

// Initialize MapboxGL
MapboxGL.setAccessToken('YOUR_MAPBOX_ACCESS_TOKEN');

const Map = () => {
  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        {/* Add your map configuration here */}
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Map;