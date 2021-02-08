import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Text, View } from '../components/Themed';

export interface TrackingMapProps {
    marker: {latlng: {
        latitude: number,
        longitude: number,
      },
      title: string,
      description: string,
    }
}

const TrackingMap: React.FC<TrackingMapProps> = ({marker}) => {
  return (
    <>
      <Text style={styles.title}>Live tracking!</Text>
      <MapView style={styles.map} >
        
          <Marker
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
          >
               <Image
    source={require('../assets/images/player.png')}
    style={{width: 26, height: 28}}
    resizeMode="contain"
  />
          </Marker>
        
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