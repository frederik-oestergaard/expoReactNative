import * as React from "react";
import { StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Text, View } from "../components/Themed";

export interface IMarker {
  latlng: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
}

export interface TrackingMapProps {
  yourLocation: IMarker;
  courier: IMarker;
}

const TrackingMap: React.FC<TrackingMapProps> = ({ courier, yourLocation }) => {
  function getRegion(pos1: IMarker, pos2: IMarker) {
    const midPointLat = (pos1.latlng.latitude + pos2.latlng.latitude) / 2;
    const midPointLong = (pos1.latlng.longitude + pos2.latlng.longitude) / 2;
    return {
      latitude: midPointLat,
      longitude: midPointLong,
      latitudeDelta:
        Math.abs(pos1.latlng.latitude - pos2.latlng.latitude) * 1.5,
      longitudeDelta:
        Math.abs(pos1.latlng.longitude - pos2.latlng.longitude) * 1.5,
    };
  }

  return (
    <>
      <Text style={styles.title}>Live tracking!</Text>
      <MapView style={styles.map} region={getRegion(courier, yourLocation)}>
        <Marker
          coordinate={yourLocation.latlng}
          title={"Your location"}
          description={yourLocation.description}
        >
          <Image
            source={require("../assets/images/house.png")}
            style={{ width: 26, height: 26 }}
            resizeMode="contain"
          />
        </Marker>
        <Marker
          coordinate={courier.latlng}
          title={courier.title}
          description={courier.description}
        >
          <Image
            source={require("../assets/images/player.png")}
            style={{ width: 26, height: 26 }}
            resizeMode="contain"
          />
        </Marker>
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
    height: "50%",
  },
});

export default TrackingMap;
