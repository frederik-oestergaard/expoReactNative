import * as React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Text, View } from '../components/Themed';

interface IMarker {
    latlng: {
        latitude: number,
        longitude: number,
      },
      title: string,
      description: string,
}

interface ITrackingMapProps {
    markers: IMarker[]
}
const TrackingMap: React.FC<ITrackingMapProps> = ({markers}) => {
  return (
    <>
      <Text style={styles.title}>Live tracking!</Text>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: '50%'
  },
});

export default TrackingMap;