import { LOCATION } from 'expo-permissions';
import { usePermissions } from 'expo-permissions/build/PermissionsHooks';
import firebase from 'firebase';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import TrackingMap from '../components/TrackingMap';
import * as Location from 'expo-location';

export default function LiveTrackingScreen() {
  // Request permissions to use the users location
  const [permission, askPermission, getPermission] = usePermissions(LOCATION, { ask: true });

  useEffect(() => {
    (async () => {

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setYourLocation({latlng: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      },
      description: "",
      title: "Your order"
    })
    })();
  }, []);

  // Subscribe to database tracking data
  useEffect(() => {
    const COLLECTION = "tracking";
    const ORDER_ID = "9003"
    const getGeoData = async () => {
      await firebase
        .firestore()
        .collection(COLLECTION)
        .doc(ORDER_ID)
        .onSnapshot((doc) => {
          if (doc) {
            const data = doc.data();
            const newLatitude = data?.geo?.latitude;
            const newLongitude = data?.geo?.longitude;
            const newExpectedArrival = new Date(data?.expectedArrival?.seconds* 1000 - new Date().getTimezoneOffset()*60000 ).toISOString()
            
            console.log("Coords: ",newLatitude, newLongitude);
            setCourier({
              latlng: {
                latitude: newLatitude,
                longitude: newLongitude,
              },
              title: "Your order",
              description: `Expected arrival: ${newExpectedArrival }`,
            })
          }
        });
    };
    getGeoData();
  }, [])

  const [courier, setCourier] = useState(
    {
      latlng: {
        latitude: 55.6760968,
        longitude: 12.5683371,
      },
      title: "",
      description: "...",
    });
  const [yourLocation, setYourLocation] = useState(
    {
      latlng: {
        latitude: 55,
        longitude: 12,
      },
      title: "Your location",
      description: "",
    });

  return (
    <View style={styles.container}>
      <TrackingMap courier={courier} yourLocation={yourLocation} />
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