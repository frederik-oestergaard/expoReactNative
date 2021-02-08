import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View } from '../components/Themed';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';

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
      <Text style={styles.title}>Live tracking</Text>
      <MapView style={styles.map} >
        {markers.map((marker, i) => (
          <Marker
          key={i}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
        />
        ))}
      
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  map: {
    width: '100%',
    height: '50%',
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
});
