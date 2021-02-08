import * as React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import TrackingMap from '../components/TrackingMap';

export default function LiveTrackingScreen() {
  const [markers, setMarkers] = useState([
    {
      latlng: {
        latitude: 55.6760968,
        longitude: 12.5683371,
      },
      title: "marker1",
      description: "marker1 description...",
    },
    {
      latlng: {
        latitude: 56.6760968,
        longitude: 9.5683371,
      },
      title: "marker2",
      description: "marker2 description...",
    },
  ]);

  return (
    <View style={styles.container}>
      <TrackingMap markers={markers} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});