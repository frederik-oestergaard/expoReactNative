import * as React from "react";
import { useEffect, useRef } from "react";
import { Image, Platform, StyleSheet } from "react-native";
import MapView, { AnimatedRegion, MarkerAnimated } from "react-native-maps";
import { Text } from "../components/Themed";

export interface IMarker {
  latlng: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
}

export interface TrackingMapProps {
  courier: IMarker;
}

const TrackingMap: React.FC<TrackingMapProps> = ({ courier }) => {

  const animatedRegion = useRef<AnimatedRegion>(new AnimatedRegion({
    latitude: courier.latlng.latitude,
    longitude: courier.latlng.longitude,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  }));
  const marker = useRef<MarkerAnimated>(null);

  useEffect(() => {
     const duration = 500
      const nextCoordinate = new AnimatedRegion({
        latitude: courier.latlng.latitude,
        longitude: courier.latlng.longitude,
        latitudeDelta: 0.04, 
        longitudeDelta: 0.04,
      });

      if (animatedRegion.current !== nextCoordinate) {
        if (Platform.OS === 'android') {
          if (marker.current) {
            marker.current.animateMarkerToCoordinate(
              courier.latlng,
              duration
            );
          }
        } else {
          animatedRegion.current.timing({
            useNativeDriver: false,
            ...courier,
            duration
          }).start();
        }
      }

  }, [courier.latlng]);

  return (
    <>
      <Text style={styles.title}>Live tracking!</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: courier.latlng.latitude,
          longitude: courier.latlng.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
      >
        <MarkerAnimated
          coordinate={courier.latlng}
          title={courier.title}
          description={courier.description}
          ref={marker}
        >
          <Image
            source={require("../assets/images/player.png")}
            style={{ width: 26, height: 26 }}
            resizeMode="contain"
          />
        </MarkerAnimated>
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: "90%",
  },
});

export default TrackingMap;
