import { format } from "date-fns";
import firebase from 'firebase';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import TrackingMap from '../components/TrackingMap';

export default function LiveTrackingScreen() {
  const [courierPosition, setCourierPosition] = useState(
    {
        latitude: 0,
        longitude: 0,
    });
    const [expectedArrivalTime, setExpectedArrivalTime] = useState<string | null>(null);
    const COLLECTION = "tracking";
    const ORDER_ID = "9003"
    let unmounted = false;
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
            const date = new Date(data?.expectedArrival?.seconds* 1000);
            const formattedDate = format(date, "MMMM do, yyyy H:mma");
            const newExpectedArrival = formattedDate;
            console.log("New coords: ",newLatitude, newLongitude);
            setExpectedArrivalTime(newExpectedArrival);
            setCourierPosition({
                latitude: newLatitude,
                longitude: newLongitude,
            })
          }
        });
    };
  // Subscribe to database tracking data
  useEffect(() => {
    getGeoData();
    return () => {unmounted = true}
  }, [])


  return (
    <View style={styles.container}>
      <TrackingMap courierPosition={courierPosition} expectedArrivalTime={expectedArrivalTime} />
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