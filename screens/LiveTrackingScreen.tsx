import firebase from 'firebase';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import TrackingMap from '../components/TrackingMap';

export default function LiveTrackingScreen() {
  // Subscribe to database tracking data
  useEffect(() => {
    let unmounted = false;
    const COLLECTION = "tracking";
    const ORDER_ID = "9003"
    const getGeoData = () => {

      firebase
        .firestore()
        .collection(COLLECTION)
        .doc(ORDER_ID)
        .onSnapshot((doc) => {
          if (!unmounted && doc) {
            const data = doc.data();
            const newLatitude = data?.geo?.latitude;
            const newLongitude = data?.geo?.longitude;
            const newExpectedArrival = new Date(data?.expectedArrival?.seconds* 1000 - new Date().getTimezoneOffset()*60000 ).toISOString()
            
            console.log("New coords: ",newLatitude, newLongitude);
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
    return () => {unmounted = true}
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

  return (
    <View style={styles.container}>
      <TrackingMap courier={courier} />
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