import * as React from "react";
import { useEffect, useRef } from "react";
import { Image, Platform, StyleSheet, Text } from "react-native";
import MapView, { AnimatedRegion, MapViewAnimated, MarkerAnimated } from "react-native-maps";
export interface TrackingMapProps {
  courierPosition: {
    latitude: number;
    longitude: number;
  };
  expectedArrivalTime: string | null;
}


const TrackingMap: React.FC<TrackingMapProps> = ({ courierPosition, expectedArrivalTime }) => {

  // Animate the movement of the courier position
  const animatedRegion = useRef<AnimatedRegion>(new AnimatedRegion({
    latitude: courierPosition.latitude,
    longitude: courierPosition.longitude,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  }));
  const marker = useRef<MarkerAnimated>(null);
  useEffect(() => {
     const DURATION = 800

      if (Number(animatedRegion.current.latitude) !== courierPosition.latitude) {
        if (Platform.OS === 'android') {
          if (marker.current) {
            marker.current.animateMarkerToCoordinate(
              courierPosition,
              DURATION
              );
            }
          } else {
          animatedRegion.current.timing({
            useNativeDriver: false,
            latitude: courierPosition.latitude,
            longitude: courierPosition.longitude,
            duration: DURATION
          }).start();
        }
      }

  }, [courierPosition]);

  if (!courierPosition.latitude && !courierPosition.longitude) {
    return <>
    <Text style={styles.title} >Your Order Location</Text>
    <Text style={styles.subTitle}>{`You order tracking will show here, once the driver is on his way to your location`}</Text>
    </>
  }
  return (
    <>
      <Text style={styles.title} >Your Order Location</Text>
      <Text style={styles.subTitle} >{`Expected Arrival: ${expectedArrivalTime}`}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: courierPosition.latitude,
          longitude: courierPosition.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
      >
        <MarkerAnimated
          coordinate={animatedRegion.current}
          title="Your order"
          description={"Expected arrival: "+expectedArrivalTime}
          ref={marker}
        >
          <Image
            source={require("../assets/images/delivery_icon.png")}
            style={{ width: 36, height: 36 }}
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
    marginHorizontal: 10,
    textAlign: "left",
    alignSelf: "stretch",
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(92, 105, 131)"
  },
  subTitle: {
    marginHorizontal: 10,
    marginBottom: 10,
    color: "rgb(92, 105, 131)",
    textAlign: "left",
    alignSelf: "stretch",
    fontSize: 14,
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: "90%",
  },
});

export default TrackingMap;
